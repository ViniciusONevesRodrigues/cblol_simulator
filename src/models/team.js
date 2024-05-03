require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    name: {
        type: String,
        required: true
    },
    Top: {
        type: String,
        required: true
    },
    Jungle: {
        type: String,
        required: true
    },
    Mid: {
        type: String,
        required: true
    },
    ADC: {
        type: String,
        required: true
    },
    Support: {
        type: String,
        required: true
    }
});

mongoose.model('teams', Team);
