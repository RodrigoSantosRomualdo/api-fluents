require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const temaNivel = require('../models/temaNivel');

const db = mongoose.connection;
//const session = await db.startSession();

router.post('/create', async (req, res) => {

   try {
     const data = temaNivel.create(req.body)

     if (data) {
      res.send({"error": false, "message": "Tema nível criado com sucesso"})
      res.status(201).end()
     }
     
   } catch (error) {
      if (erro.name === 'MongoError' && erro.code === 11000) {
         res.status(400).send({error: 'E-mail já existe'})
       } else {
         res.status(500).send(erro)
       }
   }

}); 

router.post('/buscar', async (req, res) => {

  try {
    const { tema_aprendizado } = req.body;
    const data = await temaNivel.find({tema_aprendizado});

      res.send(data)
      res.status(201).end()
    
  } catch (error) {
      console.log(error)
      res.status(500).send(erro)
  }

});

module.exports = router;