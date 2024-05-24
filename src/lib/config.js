import { getCNPJ } from "../api/consultaCNPJ.js";
import { RequestPost } from "../api/reqt.js";
import { Process1 } from "./process.js";
import { AgendaHora } from "./hora.js";
import { WhatsAppCreateAtendimento, WhatsAppImage, WhatsAppSms } from "../api/whatsapp.js";
import { normalizeString } from "./normalize.js";
import { DataFormat } from "./dateFormat.js";
import { CriarAtendimento, EnvioImg } from "./envio.js";
import { EnviarEmail } from "../api/email.js";

export default async function Config(data, erp) {
  try {
    const [uni, tempo, empresa] = await Promise.all([
      Process1(erp),
      AgendaHora(),
      getCNPJ(data.cnpj)
    ]);

    const { unidade: polo, whatsapp: tel, fantasia: nome } = uni;

    const vence = !data.vencimento ? "esta proximo de vencer" : data.vencimento;

    const obs = `Venda efetuada automaticamente Por: ${nome} - Celular: ${tel} - Polo: ${polo} - ( ${tempo.dtatual} / ${tempo.htAtual} ) vencimento: ${vence} `;

    const tipocert = !data.cpf && data.cnpj ? "A1PJ" : data.cpf && data.cnpj ? "A1PJ" : data.cpf && !data.cnpj ? "A1PF" : "";
    const valor = tipocert === "A1PJ" ? uni.a1pj : uni.a1pf;
    const valorFinal = !data.valor_venda ? uni.val_venda : !uni.val_venda? valor : data.valor_venda
    const comicao = !uni.repasse ? "0,00" : `${uni.repasse}`;

    const NomeClientFinal = normalizeString(data.nome);
    const EmpreRazFinal = normalizeString(empresa.razao);
    const EmpreEndFinal = normalizeString(empresa.end);
    const EmpreBairrFinal = normalizeString(empresa.bairro);
    const EmpreComplFinal = normalizeString(empresa.complemento);
    const EmpreCityFinal = normalizeString(empresa.cidade);

    const currentDate = new Date();
    const formattedDate = DataFormat(currentDate);

    const dadosClientes = {
      s_alerta: "ATIVADO",
      estatos_pgto: "Falta pgto",
      unidade: polo,
      nome: NomeClientFinal,
      cpf: !data.cpf ? "" : data.cpf.length < 9 ? "" : data.cpf,
      razaosocial: EmpreRazFinal,
      cnpj: data.cnpj,
      contador: nome,
      referencia: formattedDate,
      obscont: obs,
      endereco: EmpreEndFinal,
      nrua: !empresa ? "" : empresa.numero,
      bairro: EmpreBairrFinal,
      complemento: EmpreComplFinal,
      cep: !empresa ? "" : empresa.cep,
      uf: !empresa ? "" : empresa.uf,
      cidade: EmpreCityFinal,
      tipocd: tipocert,
      email: data.email,
      telefone: data.telefone,
      telefone2: !data.telefone2 ? "" : data.telefone2,
      dt_agenda: tempo.dtagend,
      hr_agenda: tempo.htagenda,
      valorcd: valorFinal,
      comissaoparceiro: comicao,
      andamento: "ERP",
      validacao: "ERP",
      scp: "A PAGAR",
    };

    async function sendSms(number, message) {
      const promises = [
        WhatsAppSms(number, message), // Deve ser uma função assíncrona ou retornar uma Promise
        EnvioImg(number), // Deve ser uma função assíncrona ou retornar uma Promise
        CriarAtendimento(number) // Deve ser uma função assíncrona ou retornar uma Promise
      ];
      await Promise.all(promises); // Espera que todas as Promises sejam resolvidas
    }

    if (data.telefone) {
      sendSms(data.telefone, `Olá! *${NomeClientFinal}*\nTudo bem?!\n\nSomos a *Rede Brasil RP*!\nParceiros da *${nome}*!\n\nEstamos lhe enviando essa mensagem para informar que já recebemos a sua solicitação!\nPedimos que aguarde,\naté às *${tempo.htagenda}* de *${tempo.agendVisual}*\nque entraremos em contato!\nSe preferir, retornar essa mensagem ou\nligar para *16 3325-4134*`);
    }
    if (data.telefone2) {
      sendSms(data.telefone2, `Olá! *${NomeClientFinal}*\nTudo bem?!\n\nSomos a Rede Brasil RP!\nParceiros da *${nome}*!\n\nEstamos lhe enviando essa mensagem para informar que já recebemos a sua solicitação!\nPedimos que aguarde,\naté às *${tempo.htagenda}* de *${tempo.agendVisual}*\nque entraremos em contato!\nSe preferir, retornar essa mensagem ou\nligar para *16 3325-4134*`);
    }

    const url = "/agenda";
    const resp = await RequestPost(url, dadosClientes);
    const subject = `NOVA SOLICITAÇÃO AGRV/ERP - ${resp.data.id}`;
    const emailEnvio = "redebrasilrp@gmail.com";
    const conteudo = "";

    await EnviarEmail(emailEnvio, subject, conteudo);
    return resp;
  } catch (error) {
    console.log(error);
  }
}