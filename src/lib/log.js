import { RequestPost } from "../api/reqt.js";

export const LogRegister = async (data) => {
  const url = "/registro";
  const dados = {
    user: data.user,
    clienteId: data.clienteId,
    clienteTel: data.clienteTel,
    clienteName: data.clienteName,
    clienteValor: data.clienteValor,
    error: data.error,
  };
 
  const check = await RequestPost(url, dados);
    const uni = check;
    

  return uni;
};
