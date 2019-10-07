const SprVsrOnlineStsMdl = require("../model/SupervisorOnlineStatus");
const AuthService = require("../services/authServices");
const utilBackend = require("../controller/utilBackend");
const ServiceReq = require("../model/ServiceReq");
const sessionCtl = {
  makeOnline: async function(req, res) {
    // online Id
    console.log("[SessionCtl] makeOnline req.body", req.body);

    if (req.body.OnlineId) {
      SprVsrOnlineStsMdl.findByIdAndUpdate(
        req.body.OnlineId,
        { statusCode: 1 },
        { new: true },
        function(err, value) {
          if (err) {
            return res.send({
              success: false,
              details: "Online id can't found"
            });
          }

          if (value) {
            console.log("[Online status ]", value.statusCode);
            return res.send({
              success: true,
              details: ""
            });
          }
        }
      );
    } else {
      return res.send({
        success: false,
        details: "Online id can't found "
      });
    }
  },

  makeOffline: async function(req, res) {
    // online Id
    console.log("[SessionCtl] makeOffline req.body", req.body);

    if (req.body.OnlineId) {
      SprVsrOnlineStsMdl.findByIdAndUpdate(
        req.body.OnlineId,
        { statusCode: 2 },
        { new: true },
        function(err, value) {
          if (err) {
            return res.send({
              success: false,
              details: "Online id can't found"
            });
          }

          if (value) {
            console.log("[Online status ]", value.statusCode);
            return res.send({
              success: true,
              details: ""
            });
          }
        }
      );
    } else {
      return res.send({
        success: false,
        details: "Online id can't found "
      });
    }
  },
  makeEngaged: async function(req, res) {
    // online Id
    console.log("[SessionCtl] makeEngaged req.body", req.body);

    if (req.body.OnlineId) {
      SprVsrOnlineStsMdl.findByIdAndUpdate(
        req.body.OnlineId,
        { statusCode: 3 },
        { new: true },
        function(err, value) {
          if (err) {
            return res.send({
              success: false,
              details: "User went offline"
            });
          }

          if (value) {
            return res.send({
              credential: {
                apiKey: global.config.openTok.apiKey,
                sessionId: value.TKBXSessionId,
                token: value.TKBXTokenId
              },
              success: true,
              details: ""
            });
          }
        }
      );
    } else {
      return res.send({
        success: false,
        details: "Online id can't found "
      });
    }
  },

  connectSessionOriganal: async function(req, res) {
    // online Id

    console.log("[SessionCtl] connectSession req.body", req.body);

    if (req.body.OnlineId) {
      SprVsrOnlineStsMdl.findById(req.body.OnlineId).exec(function(err, value) {
        if (err) {
          return res.send({
            success: false,
            details: "User went offline"
          });
        }

        if (value) {
          return res.send({
            credential: {
              apiKey: global.config.openTok.apiKey,
              sessionId: value.TKBXSessionId,
              token: value.TKBXTokenId
            },
            success: true,
            details: ""
          });
        }
      });
    } else {
      return res.send({
        success: false,
        details: "Online id can't found "
      });
    }
  },
  connectSession: async function(req, res) {
    console.log("[SessionCtl] connectSession req.body", req.body);

    if (req.body.OnlineId) {
      SprVsrOnlineStsMdl.findByIdAndUpdate(
        req.body.OnlineId,
        { statusCode: 3 },
        { new: true },
        async function(err, value) {
          if (err) {
            return res.send({
              success: false,
              details: "User went offline"
            });
          }

          if (value) {
            let body = {
              supervisorOnlineId: value._id,
              superVisorId: value.superVisorId,
              clientId: req.body._id
            };
            let serviceReq = new ServiceReq(body);
            let saved = {};

            saved = await serviceReq.save();
            return res.send({
              credential: {
                apiKey: global.config.openTok.apiKey,
                sessionId: value.TKBXSessionId,
                token: value.TKBXTokenId
              },
              serviceRequestorId: saved._id,
              success: true,
              details: ""
            });
          }
        }
      );
    } else {
      return res.send({
        success: false,
        details: "Online id can't found "
      });
    }
  },

  getSupervisors: async function(req, res) {
    clearInterval(global.timer);
    SprVsrOnlineStsMdl.find({ statusCode: 1 }, function(err, val) {
      if (err) {
        return res.send({
          success: false,
          details: "Somthing went wrong , click again"
        });
      }

      if (val.length > 0) {
        return res.send({
          success: true,
          onlineSupervisors: val
        });
      } else {
        return res.send({
          success: false,
          details:
            "Sorry ! No Supervisor are online .Please try after some time"
        });
      }
    }).populate("superVisorId");
  },

  getSupervisor: async function(req, res) {
    // online Id
    //console.log("[SessionCtl] getSupervisor req.body", req.body);

    if (req.body.userId) {
      SprVsrOnlineStsMdl.findOne(
        { superVisorId: req.body.userId, statusCode: 1 },
        function(err, value) {
          if (err) {
            return res.send({
              success: false,
              details: "Online id can't found"
            });
          }

          if (value) {
            console.log("[getSupervisor value ]", value);
            return res.send({
              success: true,
              details: "",
              data: value
            });
          } else {
            console.log("[getSupervisor not found  ]", value);
            return res.send({
              success: true,
              details: "",
              data: value
            });
          }
        }
      );
    } else {
      return res.send({
        success: false,
        details: "Online id can't found "
      });
    }
  }
};

module.exports = sessionCtl;
