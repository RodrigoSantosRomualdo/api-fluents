require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//const temaNivel = require('../models/temaNivel');
const db = mongoose.connection;

var mercadopago = require('mercadopago');
mercadopago.configure({
   access_token: process.env.ENV_ACCESS_TOKEN
});

router.post('/pagamento', async (req, res) => {
   if (process.env.padrao === req.body.padrao) {
   try {
    //  console.log(req.body.email)

      let preference = {
         items: [{
            title: 'Premium Fluents',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 9.99
            }],
         payer: {
            email: req.body.email,
         },
         back_urls: {
            failure: "https://fluents.com/failure",
            pending: "https://fluents.com/pending",
            success: "https://fluents.com/success",
         },
         payment_methods: {
            installments: 1,
            excluded_payment_types: [
               {"id": "ticket"},
               {"id":"atm"},
               {"id":"debit_card"}
            ]
         },
         
      };
      // name: "Preencher", obs: colocar no payer

      mercadopago.preferences.create(preference).then(function (data) {
        // console.log('data: ',data)
        // console.log('PASSOU AQUI');
         res.json(data.response.sandbox_init_point)
         res.status(201).end()
      }).catch(function (error) {
         console.log('error: ', error)
      });



      
    
     
   } catch (error) {
      console.log(error)
   }
} else {
   res.send('Sem autorização')
   res.status(401)
 }

}); 


module.exports = router;