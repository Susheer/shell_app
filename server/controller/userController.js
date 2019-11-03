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
    } else {
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
        password: password
      });
      user.save();

      return res.send({
        success: true,
        data: user,
        details: "User successfully created"
      });
    }
  },

  googleUser: async function(req, res) {
    let {
      name,
      familyName,
      email,
      givenName,
      googleId,
      imageUrl
    } = req.body.profileObj;

    let newUser = userModel({
      fullName: name,
      familyName: familyName,
      givenName: givenName,
      email: email,
      imgUrl: imageUrl,
      socialId: "G" + googleId,
      socialMedia: true
    });

    newUser.save();
    res.cookie(
      "token",
      JwtService.issue({ data: { id: newUser.id, sid: googleId } }),
      {
        httpOnly: true
      }
    );
    return res.send({
      success: true,
      data: {
        name: name,
        givenName: givenName,
        email: email,
        imageUrl: imageUrl
      }
    });
  },
  facebookUser: {},
  twitterUser: {},
  contactList: async function(res, res) {
    let contacts = await userModel.find();
    return res.send({
      success: true,
      data: contacts
    });
  }
};

module.exports = authController;
