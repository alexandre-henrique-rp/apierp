import "dotenv/config";
import { Router } from "express";
import { Op } from "sequelize";
import { getCNPJ } from "../src/api/consultaCNPJ.js";
import ERP from "../src/db/table/erp.js";
import ERP_LOG from "../src/db/table/erp_log.js";
import Fcweb from "../src/db/table/fcweb.js";
import Config from "../src/lib/config.js";
import { LogRegister } from "../src/lib/log.js";
import { Process1 } from "../src/lib/process.js";
import { Save } from "../src/lib/save.js";

const renovacao = Router();

// session informações do certificado
//---------------------------------------------------------------------------------------------

renovacao.post("/register/:authorization", async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    const v3 = req.params.authorization;
    const uni = await Process1(v3);

    if (!uni) {
      const data = {
        error: "ERP bloqueado",
      };
      const reg = await LogRegister(data);
      // console.log(reg);
      console.log("bloqueado");
      res.status(401).send("Unauthorized");
    } else if (data.cnpj === "") {
      const data = {
        user: uni.fantasia,
        error: "falta cnpj",
      };
      const reg = await LogRegister(data);
      // console.log(reg);
      console.log("documento vazio");
      res.status(500).send("missing documents");
    } else if (data.telefone === "" || data.telefone === null) {
      const data = {
        user: uni.fantasia,
        error: "falta telefone",
      };
      const reg = await LogRegister(data);
      // console.log(reg);
      console.log("telefone vazio");
      res.status(500).send("the phone is missing");
    } else if (data.nome === "" || data.nome === null) {
      const data = {
        user: uni.fantasia,
        error: "Cliente sem nome",
      };
      const reg = await LogRegister(data);
      // console.log(reg);
      console.log("cpf e cnpj vazio");
      res.status(500).send("the name is missing");
    } else {
      const reg = await Save(data, v3);
      res.status(201).json(reg);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

renovacao.post(
  "/register/v2/:authorization/:nome/:cnpj/:email/:telefone",
  async (req, res) => {
    try {
      const empresa = await getCNPJ(req.params.cnpj);
      // console.log(empresa);

      const data1 = {
        nome: req.params.nome,
        cnpj: req.params.cnpj,
        email: req.params.email,
        telefone: req.params.telefone,
        endereco: empresa === undefined ? "" : empresa.end,
        nrua: empresa === undefined ? "" : empresa.numero,
        bairro: empresa === undefined ? "" : empresa.bairro,
        complemento: empresa === undefined ? "" : empresa.complemento,
        cep: empresa === undefined ? "" : empresa.cep,
        uf: empresa === undefined ? "" : empresa.uf,
        cidade: empresa === undefined ? "" : empresa.cidade,
      };
      const data = data1;
      // console.log(data);
      const v3 = req.params.authorization;
      const uni = await Process1(v3);

      if (!uni) {
        const data = {
          error: "ERP bloqueado",
        };
        const reg = await LogRegister(data);
        // console.log(reg);
        console.log("bloqueado");
        res.status(401).send("Unauthorized");
      } else if (data.cnpj === "") {
        const data = {
          user: uni.fantasia,
          error: "falta cnpj",
        };
        const reg = await LogRegister(data);
        // console.log(reg);
        console.log("documento vazio");
        res.status(500).send("missing documents");
      } else if (data.telefone === "" || data.telefone === null) {
        const data = {
          user: uni.fantasia,
          error: "falta telefone",
        };
        const reg = await LogRegister(data);
        // console.log(reg);
        console.log("telefone vazio");
        res.status(500).send("the phone is missing");
      } else if (data.nome === "" || data.nome === null) {
        const data = {
          user: uni.fantasia,
          error: "Cliente sem nome",
        };
        const reg = await LogRegister(data);
        // console.log(reg);
        console.log("nome vazio");
        res.status(500).send("the name is missing");
      } else {
        const reg = await Save(data, v3);
        res.status(201).json(reg);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

renovacao.post("/agenda", async (req, res) => {
  const dados = req.body;
  // console.log(dados);
  await Fcweb.create(dados)
    .then((agendamento) => {
      res.status(200).json({
        mesage:
          "successfully registered customer, within 1 hour we will contact you",
        data: agendamento,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

renovacao.get("/check/erp/:authorization", async (req, res) => {
  await ERP.findOne({
    where: {
      authorization: {
        [Op.like]: req.params.authorization,
      },
    },
  })
    .then(async (agendamento) => {
      res.status(200).json(agendamento);
    })
    .catch(async (err) => {
      const data = {
        error: "ERP bloqueado",
      };
      await LogRegister(data);
      console.log(err);
      res.status(400).json(err);
    });
});

renovacao.get("list/user/max/polo", async (req, res) => {
  await ERP.findAll({
    attributes: ["id", "nome", "unidade"],
  });
  res.json(agendamento);
});

renovacao.get("/check/valid/:cnpj", async (req, res) => {
  await Fcweb.findOne({
    attributes: ["id", "nome", "razaosocial", "vctoCD", "cnpj"],
    where: {
      cnpj: {
        [Op.like]: req.params.cnpj,
      },
    },
  })
    .then((response) => {
      const data = {
        nome: response.nome,
        razao: response.razaosocial,
        cnpj: response.cnpj,
        vencimento: response.vctoCD,
      };
      res.status(200).json({
        mesage: "successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

renovacao.post("/registro", async (req, res) => {
  const dados = req.body;
  await ERP_LOG.create(dados)
    .then((response) => {
      // console.log(response);
      res.status(200).json({
        mesage: "successfully",
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

export default renovacao;
