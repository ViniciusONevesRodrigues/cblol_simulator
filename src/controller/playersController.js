const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/players');
const Players = mongoose.model('players');

router.get('/players', (req, res) => {
    Players.find().lean().then((players) => {
        res.render("admin/players/players", { players: players });
    });
});

router.get('/players/add', (req, res) => {
    res.render("admin/players/addplayers");
});

router.post('/players/new', (req, res) => {
    Players.findOne({ playername: req.body.name }).then(existingPlayer => {
        if (existingPlayer) {
            res.send("Nome de jogador já cadastrado!");
        } else {
            var players = new Players({
                playername: req.body.name,
                skill: req.body.skill,
                position: req.body.position,
                team: "Nenhum",
                age: req.body.age
            });
            players.save().then(() => {
                res.redirect("/rota_players/players");
            }).catch((erro) => {
                res.send('Houve um erro: ' + erro);
            });
        }
    })
});


router.get('/edit_players/:id', (req, res) => {
    Players.findOne({ _id: req.params.id }).lean().then((players) => {
        res.render("admin/players/editplayers", { players: players });
    });
});

router.post('/players/edit_players', (req, res) => {
    Players.updateOne({ _id: req.body.id },
        { $set: { playername: req.body.name, skill: req.body.skill, position: req.body.position, age: req.body.age } }).then(() => {
            res.redirect("/rota_players/players");
        });
});

router.get('/delete_players/:id', (req, res) => {
    Players.deleteMany({ _id: req.params.id }).then(() => {
        res.redirect("/rota_players/players");
    });
});

module.exports = router;