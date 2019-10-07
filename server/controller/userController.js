const userModel = require("../model/User");
const JwtService = require("../services/authServices");
const authController = {
  createUser: async function(req, res) {
    console.log("[AuthCtl  Invoked]", req.body);

    if (!("fullName" in req.body) || !req.body.fullName) {
      return res.send({
        success: false,
        details: "Name cannot be empty"
      });
    } else if (!("email" in req.body) || !req.body.email) {
      return res.send({
        success: false,
        details: "Email cannot be empty"
      });
    } else if (!("password" in req.body) || !req.body.password) {
      return res.send({
        success: false,
        details: "Password cannot be empty"
      });
    }  else {
      console.log("[UserCreate] validation successfull");
    }

    let email = req.body.email.trim().toLowerCase();
    let password = req.body.password.trim();
    let userName = req.body.fullName.trim().toLowerCase();
    

    let user = await userModel.findOne({
      email: email
    });

    if (user) {
      // send token in body

      return res.send({
        success: false,
        details: "Email id in use "
      });
    } else {
      let user = new userModel({
        fullName: userName,
        email: email,
        password: password,
      
      });
      user.save();

      return res.send({
        success: true,
        data: user,
        details: "User successfully created"
      });
    }
  },

  contactList: async function(res, res) {
    let contacts = await userModel.find();
    return res.send({
      success: true,
      data: contacts
    });
  }
};

module.exports = authController;
