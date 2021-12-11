require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');


const generator = require('generate-password');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const moment = require("moment");

const db = mongoose.connection;
//const session = await db.startSession();

router.post('/premium', async (req, res) => { 

  try {

    let date = new Date();
    console.log(date.getFullYear())
    const dataBrasil = date.setFullYear(date.getFullYear() + 1)
    //moment(dataBrasil).format("DD/MM/YYYY");
    //console.log('moment(dataBrasil).format("DD/MM/YYYY"): ', moment(dataBrasil).format("DD/MM/YYYY"))
    
    await User.updateOne({email: "rodrigo.s.romualdo@gmail.com"}, { $set: {premium: false, data_premium: dataBrasil }})
    const dateresult = await User.find({email: "rodrigo.s.romualdo@gmail.com"})
    console.log('date: ', moment(dateresult[0].data_premium).format("DD/MM/YYYY") )
    res.json({
      status: "SUCESSO",
      message: "Você acabou de ser premium",
    });
    
  } catch (error) {
    res.json({
      status: "FAILED",
      message: "Ocorreu erro em ser premium",
    });
    
  }


});

router.post('/create', async (req, res) => {

    console.log(req.body)
    let { email, password, nome} = req.body;
    email = email.trim();
    password = password.trim();
  
    if (email == "" || password == "") {
      res.json({
        status: "FAILED",
        message: "Empty input fields!",
      });
   /* } else if (!/^[a-zA-Z ]*$/.test(name)) {
      res.json({
        status: "FAILED",
        message: "Invalid name entered",
      });  */
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      res.json({
        status: "FAILED",
        message: "Email inserido inválido",
      });
    /*}  else if (!new Date(dateOfBirth).getTime()) {
      res.json({
        status: "FAILED",
        message: "Invalid date of birth entered",
      });  */
     } else if (password.length < 5) {
        res.json({
          status: "FAILED",
          message: "A senha é muito curta!",
        });
      } else {
        // Checking if user already exists
        User.find({ email })
          .then((result) => {
            if (result.length) {
              // A user already exists
              res.json({
                status: "FAILED",
                message: "O usuário com o e-mail já existe",
              });
            } else {
              // Try to create new user
    
              // password handling
              const saltRounds = 10;
              bcrypt
                .hash(password, saltRounds)
                .then((hashedPassword) => {
                  const newUser = new User({
                    nome,
                    email,
                    password: hashedPassword,
                  });   
                  
                  newUser
                    .save()
                    .then((result) => {
                      res.json({
                        status: "SUCCESS",
                        message: "Signup successful",
                        email: result.email,
                      });
                    })
                    .catch((err) => {
                      res.json({
                        status: "FAILED",
                        message: "An error occurred while saving user account!",
                      });
                    });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An error occurred while hashing password!",
                  });
                });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: "FAILED",
              message: "An error occurred while checking for existing user!",
            });
          });
      }

}); 

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    User.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists

          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  _id: data[0]._id,
                  nome: data[0].nome,
                  email: data[0].email,
                  dataCadastro: data[0].dataCadastro
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
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
    try {
       console.log(req.body)
       const { email } = req.body;
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