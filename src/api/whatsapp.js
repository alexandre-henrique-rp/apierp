import "dotenv/config";
import axios from "axios";

export const WhatsAppSms = async (tel, msg) => {
  const url = `${process.env.ZAP_URL_API}/core/v2/api/chats/send-text`;

  const resposta = await axios({
    method: "POST",
    url: url,
    headers: {
      "access-token": process.env.ZAP_TOKEN,
      "Content-Type": 'application/json'
    },
    data: {
      number: "55" + tel,
      message: msg,
      forceSend: true,
      verifyContact: false
    },
    redirect: "follow"
  })
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      return "Mensagem entregue";
    })

    .catch((error) => {
      console.log("error", error.response.data);
      return "não foi possível contactar o esse cliente, tente outra forma de contato";
    });
  return resposta;
};

export const WhatsAppVerific = async (tel) => {
  const telefone = tel;
  const url =
    `${process.env.ZAP_URL_API}/core/v2/api/wa-number-check/55${telefone}`;

  const resposta = await axios({
    method: "POST",
    url: url,
    headers: {
      "access-token": process.env.ZAP_TOKEN,
      "Content-Type": 'application/json'
    },
    redirect: "follow"
  })
    .then((response) => {
      // console.log(response.data);
      const resultado = response.data;
      const resp =
        resultado.status !== "VALID_WA_NUMBER"
          ? { resultado: resultado, telefone: telefone }
          : { resultado: resultado, telefone: "" };

      return resp;
    })
    .catch(function (error) {
      console.log(error.data);
      const resultado = error.data;
      return {
        resultado,
        telefone
      };
    });
  return resposta;
};

export const WhatsAppImage = async (tel, msg) => {
  const url = `${process.env.ZAP_URL_API}/core/v2/api/chats/send-media`;
  try {
    const response = await axios.post(url, {
      number: "55" + tel,
      forceSend: true,
      verifyContact: true,
      linkUrl: "https://redebrasilrp.com.br/_assets/img/cnh_foto.jpeg",
      extension: ".jpg",
      base64: "",
      fileName: "cnh_foto",
      caption: msg
    }, {
      headers: {
        "access-token": process.env.ZAP_TOKEN,
        "Content-Type": 'application/json'
      }
    });
    // console.log(JSON.stringify(response.data));
    return "Mensagem entregue";
  } catch (error) {
    console.log("error", error.response.data);
    return "não foi possível contactar o esse cliente, tente outra forma de contato";
  }
};


export const WhatsAppCreateAtendimento = async (tel) => {
  const url = `${process.env.ZAP_URL_API}/core/v2/api/chats/create-new`;

  try {
    const response = await axios.post(url, {
      "number": `55${tel}`,
      "message": "Obrigado por esperar! Vamos resolver isso juntos em breve. 😄",
      "sectorId": "60de0c8bb0012f1e6ac55473"
    }, {
      headers: {
        "access-token": process.env.ZAP_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      
    });

    // console.log(JSON.stringify(response.data));
    return "Atendimento criado com sucesso";
  } catch (error) {
    console.log("error", error.response.data);
    return "não foi possível criar atendimento para ese cliente";
  }
};
