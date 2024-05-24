import Sequelize from "sequelize";
import database from "../conection/db.js";

/**
 * ERP
 * tabela de erp
 * @return = {id,nome,fantasia,email,end,bairro,numero,cidade,pais,Ie,tel,whatsapp,a1pf,a3pf,a1pj,a3pj,status,regime,createdAt,updatedAt,cnpj,uf,simples,unidade,authorization,repasse,val_venda}
 */
const ERP = database.define(
  "erp",
  {
    //nome da tabela a ser conectada
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: Sequelize.STRING,
    fantasia: Sequelize.STRING,
    email: Sequelize.STRING,
    end: Sequelize.STRING,
    bairro: Sequelize.STRING,
    numero: Sequelize.INTEGER,
    cidade: Sequelize.STRING,
    pais: Sequelize.STRING,
    Ie: Sequelize.STRING,
    tel: Sequelize.STRING,
    whatsapp: Sequelize.STRING,
    a1pf: Sequelize.FLOAT,
    a3pf: Sequelize.FLOAT,
    a1pj: Sequelize.FLOAT,
    a3pj: Sequelize.FLOAT,
    status: Sequelize.INTEGER,
    regime: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    cnpj: Sequelize.STRING,
    uf: Sequelize.STRING,
    simples: Sequelize.STRING,
    unidade:Sequelize.STRING,
    authorization: Sequelize.STRING,
    repasse:Sequelize.FLOAT,
    val_venda:Sequelize.FLOAT,
  },
  { freezeTableName: true }
); // função para conectar tebela ja criada

//criar ou sincronizar a tabela
// ERP.sync();

export default ERP;