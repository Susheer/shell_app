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
    },
    contest: {
      create: "/admin/contest/create",
      edit: "/admin/contest/edit",
      list: "/admin/contest/list",
      listByMatch: "/admin/contest/list_by_match",
      participate: "/contest/participate"
    },
    pmnt_getway: {
      pay_with_paytm: "/pay/paytm",
      paytm_response: "/pay/paytm/res"
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
