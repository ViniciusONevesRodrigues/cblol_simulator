const express = require("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const rota_teams = require('./controller/teamsController');
const rota_players = require('./controller/playersController');
const PORT = 8081;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine({ 
    defaultLayout: 'main',
    helpers: {
        isSelected: function(selectedValue, value) {
            return value === selectedValue ? 'true' : 'false';
        },
        eq: function(val1, val2) {
            return val1 === val2;
        }
    }
}));
app.set('view engine', 'handlebars');
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/js', express.static('public/js'));


app.get('/', (req, res) => {
    res.render("admin/index");
});

app.use('/rota_teams', rota_teams);
app.use('/rota_players', rota_players);


app.listen(PORT, () => {
    console.log("http://localhost:8081/");
})