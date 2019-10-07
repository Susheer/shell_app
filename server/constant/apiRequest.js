var apiRequest = {
  auth: {
    login: {
      url: "/user/login",
      vFlag: 0,
      mandatory: []
    },
    logout: {
      url: "/user/logout",
      vFlag: 0,
      mandatory: []
    }
  },

  post: {
    payment: {
      url: "/user/payment",
      callBack: "/user/callback"
    },
    addMatch: {
      url: "/match/add"
    },
    removeMatches: {
      url: "/matches/add"
    },
    editMatches: {
      url: "/matches/add"
    }
  },
  get: {
    helloRequest: {
      url: "/hello",
      vFlag: 0,
      mandatory: []
    }
  }
};

module.exports = apiRequest;
