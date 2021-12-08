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

   try {
      console.log(req.body)

      let preference = {
         items: [{
            title: 'Blue shirt',
            quantity: 10,
            currency_id: 'BRL',
            unit_price: 10
            }],
         payer: {
            email: "demo@mail.com"
         },
         payment_methods: {
            installments: 1
         }
      };

      mercadopago.preferences.create(preference).then(function (data) {
         console.log('data: ',data)
         res.json(data.response.sandbox_init_point)
         res.status(201).end()
      }).catch(function (error) {
         console.log('error: ', error)
      });



      
    
     
   } catch (error) {
      console.log(error)
   }

}); 


module.exports = router;