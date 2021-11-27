const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temaNivel = new Schema({
    tema_aprendizado: String,
    nivel_disponivel: String,
    ordem: Number,
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('TemaNivel', temaNivel)


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