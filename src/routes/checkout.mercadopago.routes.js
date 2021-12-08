require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//const temaNivel = require('../models/temaNivel');

const db = mongoose.connection;
//const session = await db.startSession();

router.post('/pagamento', async (req, res) => {

   try {
      console.log(req.body)
      res.send({"error": false, "message": "RETORNO DO CHECKOUT"})
      res.status(201).end()
    

    //res.json({"error": false, "message": "Chegou o MP"})
    //res.status(201).end()

  
     
   } catch (error) {
      console.log(error)
   }

}); 


module.exports = router;