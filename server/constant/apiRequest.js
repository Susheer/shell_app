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
    addGame: {
      url: "/admin/game/add"
    },
    listGame: {
      url: "/game/list"
    },
    createUser: {
      url: "/user/create",
      vFlag: 0,
      mandatory: []
    },
    makeOnline: {
      url: "/supervisor/online",
      vFlag: 0,
      mandatory: []
    },
    makeOffline: {
      url: "/supervisor/offline",
      vFlag: 0,
      mandatory: []
    },
    makeEngaged: {
      url: "/supervisor/engaged",
      vFlag: 0,
      mandatory: []
    },
    getSupervisors: {
      url: "/supervisor/list",
      vFlag: 0,
      mandatory: []
    },
    connectSession: {
      url: "/session/connect",
      vFlag: 0,
      mandatory: []
    },
    contacts: {
      url: "/user/contact",
      vFlag: 0,
      mandatory: []
    },
    getSupervisor: {
      url: "/user/contact/supervisor/onlineStatus"
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
