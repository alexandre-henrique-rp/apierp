import 'dotenv/config'
import Sequelize from 'sequelize';

const DataBese = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
     host: process.env.DB_HOST,
     dialect: process.env.DIALECT,
});

DataBese.authenticate()
     .then(() => {
          console.log('👍 👍 Conexão com o banco de dados foi estabelecida com sucesso! 👍 👍');
     })
     .catch(err => {
          console.error('👎👎 Erro: Conexão com o banco de dados não realizada:' + err + '👎👎');
     });
export default DataBese;
