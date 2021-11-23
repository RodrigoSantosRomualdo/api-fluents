const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://teste:teste12345@cluster0.g21sq.mongodb.net/fluents-dev?retryWrites=true&w=majority';

mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('DB Conectado!'))
    .catch(() => console.log('erro DB: ', err))