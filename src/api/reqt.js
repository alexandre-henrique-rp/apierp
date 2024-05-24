import "dotenv/config";
import axios from "axios";

export const RequestGet = async (url) => {
  const resp = await axios({
    method: "get",
    url: process.env.SERVE_CONSULT + url,
  })
    .then((response) => {
      const data = response.data;
      console.log({status: 200, message: 'requisição bem sucedida'});
      return data;
    })
    .catch((erro) => {
      console.error({status: 400, message: 'A requisição falhou'});
      return erro;
    });
  const result = await resp;
  return result;
};

export const RequestPost = async (url, data) => {
  const resp = await axios({
    method: "post",
    url: process.env.SERVE_CONSULT + url,
    data: data,
  })
    .then((response) => {
      const data = response.data;
      console.log({status: 200, message: 'informações gravadas com sucesso'});
      return data;
    })
    .catch((erro) => {
      console.error({status: 400, message: 'A Gravação das informações falhou'});
      return erro;
    });
  const result = await resp;
  return result;
};

export const RequestPut = async (url, data) => {
  const resp = await axios({
    method: "put",
    url: process.env.SERVE_CONSULT + url,
    data: data,
  })
    .then((response) => {
      const data = response.data;
      console.log({status: 200, message: 'informações atualizadas com sucesso'});
      return data;
    })
    .catch((erro) => {
      console.error({status: 400, message: 'A atualização das informações falhou'});
      return erro;
    });
  const result = await resp;
  return result;
};
