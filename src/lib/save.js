import Config from "./config.js";
import { LogRegister } from "./log.js";

export const Save = async (data, v3) => {
  const confg = await Config(data, v3);
  const dados = {
    user: confg.data.contador,
    clienteId: confg.data.id,
    clienteTel: confg.data.telefone,
    clienteName: confg.data.nome,
    clienteValor: confg.data.nome,
    error: "success",
  };
  await LogRegister(dados);

  return confg;
};
