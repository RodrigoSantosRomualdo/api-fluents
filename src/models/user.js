const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    nome: String,
    foto: String,
    email: String,
    password: String,
    telefone: String,
    premium: Boolean,
    data_premium: Date,
    email_sistema_externo: Boolean,
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('User', user)


/*
documento: {
        tipo: {
            type: String,
            enum: ['cpf'],
            require: true
        },
        numero: {
            type: String,
            required: true,
        }
    },
    endereco: {
        cidade: String,
        uf: String,
        cep: String,
        numero: PerformanceServerTiming,
        pais: String
    }
    */