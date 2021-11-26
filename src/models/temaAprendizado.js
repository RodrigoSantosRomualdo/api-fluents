const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tema = new Schema({
    nome: String,
    ordem: Number,
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('Tema', tema)


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