require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const tema = require('../models/temaAprendizado');

const db = mongoose.connection;
//const session = await db.startSession();

router.post('/create', async (req, res) => {

    console.log(req.body)
    let { nome, ordem} = req.body;
    console.log(nome, '  ' , ordem)
   try {
     const data = tema.create(req.body)

     if (data) {
      res.send({"error": false, "message": "Tema criado com sucesso"})
      res.status(201).end()
     }
     
   } catch (error) {
      if (erro.name === 'MongoError' && erro.code === 11000) {
         res.status(400).send({error: 'Erro ao criar Tema'})
       } else {
         res.status(500).send(erro)
       }
   }

}); 

router.post('/buscar', async (req, res) => {

  try {

    const data = await tema.find({});

      res.send(data)
      res.status(201).end()
    
  } catch (error) {
      console.log(error)
      res.status(500).send(erro)
  }

})


router.post('/recupera-password', async (req, res) => {
    let { email } = req.body;
    console.log(email)
    email = email.trim();
  
    if (email == "") {
      res.json({
        status: "FAILED",
        message: "Empty credentials supplied",
      });
    } else {
     // Check if user exist
     const data = await User.find({ email  }, {password: 0})
        //console.log('data: ',data[0].email)
        
        if (data.length) {
           const password = generator.generate({
              length: 10,
              numbers: true
           });
  
           const transporte =  nodemailer.createTransport({
              host: 'smtp.hostinger.com',
                  port: 465,
                  secure: true, //SSL/TLS
                  auth: {
                      user: process.env.nodemailerUserRecuperaSenha,
                      pass: process.env.nodemailerPassRecuperaSenha
                  }
          })
      
          transporte.sendMail({
              from: process.env.nodemailerUserRecuperaSenha,
              to: data[0].email,
              subject: `Recuperação de senha - App Fluents`,
              //text: mensagem,
              html: `<p>Olá, tudo bem? </p>
              <p>Você pediu para recuperar a sua senha</p>
              <p>Geramos uma nova senha para você, caso deseje trocar a senha basta logar no app e ir na opção de alterar senha.</p>
              <p>sua nova senha é: <b>${password}</b></p>
              <br><p>Atenciosamente,</b></p>`
          }).then(info => {
              //console.log('info: ', info)
              //User.updateOne({email: email}, { $set: {password: password}} )
             
              const saltRounds = 10;
              bcrypt
                .hash(password, saltRounds)
                .then((hashedPassword) => {
                  User.updateOne({email: email}, { $set: {password: hashedPassword}}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated SENHA ");
                   });
                })
  
              res.send({error: false, message: 'E-mail enviado com sucesso'})
          }).catch(error => {
              console.log('error: ', error)
              res.send({error: false, message: 'E-mail não encontrado'})
          })
  
        } else {
           res.send({error: true, message: 'E-mail não encontrado'})
        }
        
        
     }  

})

router.post('/finduser', async (req, res) => {
    console.log('Busca USER', )
    //let teste = "rsr@gmail.com"
    try {
       console.log(req.body)
       const data = await User.find({email: email},{password: 0})
        
       if (data.length === 0) {
         res.send({error: false, existeData: false, data})
         res.status(201).end()
       } else {
         res.send({error: false, existeData: true, data})
         res.status(201).end()
       }
         
       
    }
    catch(erro) {
       // HTTP status 500: Internal Server Error
       //console.log('---> ', erro.code)
         if (erro.name = 'MongoError') {
             //res.status(400).send(erro)
         } else {
             //res.status(500).send(erro)
         }
    }

})

router.post('/create-user-email', async (req, res) => {
    console.log('NOVO USER CRIADOPELO EMAIL')
    try {
 
     const data = await User.create(req.body)
     
     if(data._id) {
       res.send({"error": false})
       res.status(201).end()
     }
     
    
    }
    catch(erro) {
       // HTTP status 500: Internal Server Error
       console.log(erro.name)
       if (erro.name === 'MongoError' && erro.code === 11000) {
         res.status(400).send({error: 'E-mail já existe'})
       } else {
         res.status(500).send(erro)
       }
       
    }

})





module.exports = router;