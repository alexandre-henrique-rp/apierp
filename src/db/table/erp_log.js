import Sequelize from "sequelize";
import database from "../conection/db.js";

const ERP_LOG = database.define(
  "erp_log",
  {
    //nome da tabela a ser conectada
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user: Sequelize.TEXT,
    createdAt: Sequelize.DATE,
    clienteId: Sequelize.INTEGER,
    clienteTel: Sequelize.TEXT,
    clienteName: Sequelize.TEXT,
    clienteValor: Sequelize.TEXT,
    updatedAt: Sequelize.DATE,
    error: Sequelize.TEXT,
  },
  { freezeTableName: true }
); // função para conectar tebela ja criada

//criar ou sincronizar a tabela
// ERP_LOG.sync();

export default ERP_LOG;
