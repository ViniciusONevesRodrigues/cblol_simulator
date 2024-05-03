require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Players = new Schema({
    playername: {
        type: String,
        required: true
    },
    skill: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

mongoose.model('players', Players);
