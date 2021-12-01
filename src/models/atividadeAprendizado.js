const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const atividade = new Schema({
    nome_exercicio_ingles: String,
    nome_exercicio_fala: String,
    nome_exercicio_portugues: String,
    tema_aprendizado: String,
    nivel_disponivel: String,
    id_audio: String,
    ordem: Number,
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('Atividade', atividade)


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