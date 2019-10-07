const gameModel = require("../model/Game");

const gameCTL = {
  add: async function(req, res) {
    console.log("[gameCTL  Invoked]", req.body);

    if (!("title" in req.body) || !req.body.title) {
      return res.send({
        success: false,
        details: "Title cannot be empty"
      });
    } else if (!("icon" in req.body) || !req.body.icon) {
      return res.send({
        success: false,
        details: "icon cannot be empty"
      });
    } else {
      console.log("[Game Added ] validation successfull");
    }

    let icon = req.body.icon;

    let title = req.body.title.trim().toUpperCase();

    let game = await gameModel.findOne({
      title: title
    });

    if (game) {
      // send token in body

      return res.send({
        success: false,
        details: "Game  alredy exists "
      });
    } else {
      let game = new gameModel({
        title: title,
        icon: icon
      });
      game.save();

      return res.send({
        success: true,
        data: game,
        details: "game successfully created"
      });
    }
  },

  gamesList: async function(res, res) {
    let games = await gameModel.find();
    return res.send({
      success: true,
      data: games
    });
  }
};

module.exports = gameCTL;
