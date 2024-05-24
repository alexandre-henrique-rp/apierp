import express from 'express';
import swaggerUi from 'swagger-ui-express'
import renovacao from './router/renovação.js';
import swagerDoc from "./src/documentation/swagger.json" assert { type: "json" };
import cors from 'cors';

const port = process.env.SERVE_PORT
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDoc))
app.use('/teste', async(req, res)=>{
    res.end('ok')
})


app.use("/v1", renovacao)
app.listen(port, function () {
    console.log('🚀🚀🤖 servidor em execução 🤖🚀🚀')
    console.log('🚀🚀🤖 '+port+' 🤖🚀🚀')
});