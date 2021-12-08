const express =  require('express');
const morgan = require('morgan');
require('./database')
const app = express();
const cors = require('cors');

// MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// VARIABLES
//app.set('port', process.env.PORT || 3000);

// ROTAS
app.use('/user',require('./src/routes/user.routes'));
app.use('/tema',require('./src/routes/tema.routes'));
app.use('/tema-nivel',require('./src/routes/tema.nivel.routes'));
app.use('/atividade',require('./src/routes/atividade.nivel.routes'));
app.use('/checkout',require('./src/routes/checkout.mercadopago.routes'))

const port = 3000;
app.listen(process.env.PORT || port);
console.log('`BACK-END FLUENTS API - porta', process.env.PORT || port);
