const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/CBLOL_SIMULATOR';

mongoose.connect(url).then(() => {
    console.log('Conectado na base de dados');
}).catch((err) => {
    console.log('Erro ao conectar na base de dados, erro: ' + err);
});