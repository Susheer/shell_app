const matchModel = require("../model/Match");
const flagModel = require("../model/Flag");

const matchCTL = {
  add: async function (req, res) {
    console.log("[req.body]", req.body);
    if (!("flag_a" in req.body) || !req.body.flag_a) {
      return res.send({
        success: false,
        details: "flag_a cannot be empty",
      });
    } else if (!("flag_b" in req.body) || !req.body.flag_b) {
      return res.send({
        success: false,
        details: "flag_b cannot be empty",
      });
    } else if (!("title" in req.body) || !req.body.title) {
      return res.send({
        success: false,
        details: "Title cannot be empty",
      });
    } else if (!("sportsName" in req.body) || !req.body.sportsName) {
      return res.send({
        success: false,
        details: "sportsName cannot be empty",
      });
    } else if ("status" in req.body && !req.body.status) {
      return res.send({
        success: false,
        details: "status cannot be empty",
      });
    } else if (!("startDate" in req.body) || !req.body.startDate) {
      return res.send({
        success: false,
        details: "startDate cannot be empty",
      });
    } else if (!("team_a" in req.body) || !req.body.team_a) {
      return res.send({
        success: false,
        details: "team_a cannot be empty",
      });
    } else if (!("team_b" in req.body) || !req.body.team_b) {
      return res.send({
        success: false,
        details: "team_b cannot be empty",
      });
    } else if (!("team_b" in req.body) || !req.body.team_b) {
      return res.send({
        success: false,
        details: "team_b cannot be empty",
      });
    } else if ("status" in req.body) {
      if (!("status_color" in req.body) || !req.body.status_color) {
        return res.send({
          success: false,
          details: "status_color cannot be empty",
        });
      }
    } else if (!("flag_a_color" in req.body) || !req.body.flag_a_color) {
      return res.send({
        success: false,
        details: "flag_a_color cannot be empty",
      });
    } else if (!("flag_b_color" in req.body) || !req.body.flag_b_color) {
      return res.send({
        success: false,
        details: "flag_b_color cannot be empty",
      });
    } else {
      // check if flags are in db
      let flag_a = await flagModel.findOne({
        title: req.body.flag_a,
      });

      if (!flag_a) {
        return res.send(` ${req.body.flag_a} not found in system `);
      }

      let flag_b = await flagModel.findOne({
        title: req.body.flag_b,
      });

      if (!flag_b) {
        return res.send(` ${req.body.flag_b} not found in system `);
      }

      console.log("[All param are set  ] ");
    }

    // save it to db
    let newMatch = new matchModel(req.body);
    newMatch.save();

    return res.send({
      success: true,
      newMatch: newMatch,
      details: "new Match created",
    });
  },
  list: async (req, res) => {
    console.info("[Match list inviked]");
    let matches = await matchModel.find();
    console.info("[Match list inviked]->", matches);
    return res.send({
      success: true,
      matches: matches,
    });
  },
};

module.exports = matchCTL;
