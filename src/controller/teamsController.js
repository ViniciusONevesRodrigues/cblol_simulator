const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

require('../models/players');
require('../models/team');
const Players = mongoose.model('players');
const Teams = mongoose.model('teams');

router.get('/teams', (req, res) => {
    Teams.find().lean().then((teams) => {
        res.render("admin/teams/teams", { teams: teams })
    })
})

router.get('/teams/add', (req, res) => {
    Players.find().lean().then((players) => {
        res.render("admin/teams/addteams", { players: players });
    })
})

router.post('/teams/new', (req, res) => {
    var teams = new Teams();
    teams.name = req.body.name;
    teams.Top = req.body.Top;
    teams.Jungle = req.body.Jungle;
    teams.Mid = req.body.Mid;
    teams.ADC = req.body.ADC;
    teams.Support = req.body.Support;

    teams.save().then(() => {
        Players.updateMany(
            { playername: { $in: [req.body.Top, req.body.Jungle, req.body.Mid, req.body.ADC, req.body.Support] } },
            { $set: { team: req.body.name } }
        ).then(() => {
            res.redirect("/rota_teams/teams");
        }).catch((error) => {
            res.send("Erro ao atualizar os jogadores: " + error);
        });
    }).catch((error) => {
        res.send("Houve um erro ao salvar o time: " + error);
    });
})

router.get('/edit_teams/:id', (req, res) => {
    Teams.findOne({ _id: req.params.id }).lean().then((teams) => {
        Players.find().lean().then((players) => {
            res.render("admin/teams/editteams", { teams: teams, players: players });
        });
    })
});

router.post('/teams/edit_teams', (req, res) => {
    const oldPositions = {
        "Top": req.body.oldTop,
        "Jungle": req.body.oldJungle,
        "Mid": req.body.oldMid,
        "ADC": req.body.oldADC,
        "Support": req.body.oldSupport
    };

    const newPositions = {
        "Top": req.body.Top,
        "Jungle": req.body.Jungle,
        "Mid": req.body.Mid,
        "ADC": req.body.ADC,
        "Support": req.body.Support
    };

    const updatePromises = [];

    Object.keys(oldPositions).forEach((position) => {
        if (oldPositions[position] !== newPositions[position]) {
            updatePromises.push(
                Players.updateOne({ playername: oldPositions[position] }, { $set: { team: "Nenhum" } })
            );
        }
    });

    Promise.all(updatePromises).then(() => {
        Teams.updateOne({ _id: req.body.id }, {
            $set: {
                name: req.body.name,
                Top: req.body.Top,
                Jungle: req.body.Jungle,
                Mid: req.body.Mid,
                ADC: req.body.ADC,
                Support: req.body.Support
            }
        }).then(() => {
            res.redirect("/rota_teams/teams");
        }).catch((error) => {
            res.send("Erro ao atualizar os dados do time: " + error);
        });
    }).catch((error) => {
        res.send("Erro ao atualizar os jogadores anteriores: " + error);
    });
});

router.get('/delete_teams/:id', (req, res) => {
    Teams.findById(req.params.id).then(team => {
        Players.updateMany({ team: team.name }, { $set: { team: "Nenhum" } }).then(() => {
            Teams.deleteMany({ _id: req.params.id }).then(() => {
                res.redirect("/rota_teams/teams");
            });
        })
    });
});



module.exports = router;