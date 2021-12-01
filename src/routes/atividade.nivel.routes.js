require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const atividadeAprendizado = require('../models/atividadeAprendizado');

const db = mongoose.connection;
//const session = await db.startSession();

router.post('/create', async (req, res) => {

    console.log(req.body)
    let { nome, ordem, nivel_disponivel} = req.body;
    console.log(nome, '  ' , ordem, ' ', nivel_disponivel)
   try {
     const data = atividadeAprendizado.create(req.body)

     if (data) {
      res.send({"error": false, "message": "Exercicio criado com sucesso"})
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

router.post('/buscar-atividade', async (req, res) => {

  try {
    const { tema_aprendizado, nivel_disponivel, ordem } = req.body;

    const data = await atividadeAprendizado.findOne({tema_aprendizado, nivel_disponivel, ordem })

    if (data === null) {
      res.send({error: false, message: "Nivel Finalizado!"})
      res.status(201).end() 
    } else if (data) {



      res.send(data)
      res.status(201).end() 
    }

   
    
  } catch (error) {
      console.log(error)
      res.status(500).send(erro)
  }

});

module.exports = router;