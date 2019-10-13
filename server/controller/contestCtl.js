const userModel = require("../model/User");
const contestModel = require("../model/Contest");
const Game = require("../model/Game");
const contestCtl = {
  create: async function(req, res) {
    console.log("[contestCtl->Add]", req.body);

    if (!("match" in req.body) || !req.body.match) {
      return res.send({
        success: false,
        details: "match cannot be empty"
      });
    } else if ("creater" in req.body && !req.body.creater) {
      return res.send({
        success: false,
        details: "creater  cannot be empty"
      });
    } else if (!("title" in req.body) || !req.body.title) {
      return res.send({
        success: false,
        details: "title cannot be empty"
      });
    } else if (!("poolAmount" in req.body) || !req.body.poolAmount) {
      return res.send({
        success: false,
        details: "poolAmount  cannot be empty"
      });
    } else if (!("entryFee" in req.body) || !req.body.entryFee) {
      return res.send({
        success: false,
        details: "entryFee  cannot be empty"
      });
    } else if (!("poolSize" in req.body) || !req.body.poolSize) {
      return res.send({
        success: false,
        details: "poolSize  cannot be empty"
      });
    } else {
      console.log("[UserCreate] validation successfull");
    }

    let newContest = new contestModel(req.body);

    newContest.save(function(err) {
      if (err) {
        console.log("contestCtl->Create", err.message);
        res.status(400);
        return res.send(
          "Error: We found some problem , if this comes again report this to admin along with all parameter that you are trying to push. Thanks"
        );
      }
      console.log("contestCtl->Create new contest saved");
      return res.send({
        success: true,
        data: newContest,
        details: "New contest created"
      });
    });
  },

  list: async function(res, res) {
    console.log("[contestCtl->List]");
    let contests = await contestModel.find().populate("match");
    return res.send({
      success: true,
      data: contests
    });
  },

  listByMatch: async function(req, res) {
    console.log("[contestCtl->listByMatch]");
    if (!("match" in req.body) || !req.body.match) {
      return res.send({
        success: false,
        details: "match not found"
      });
    }
    let contests = await contestModel
      .find({ match: req.body.match })
      .populate("match");
    return res.send({
      success: true,
      data: contests
    });
  },
  participate: async function(req, res) {},
  edit: async function(req, res) {},
  delete: async function(req, res) {}
};

module.exports = contestCtl;
