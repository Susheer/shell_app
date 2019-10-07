const ServiceReq = require("../model/ServiceReq");
const backendAsyncMethods = {
  serviceRequesterIns: async function(param) {
    // online Id
    let body = param;
    let serviceReq = new ServiceReq(body);
    await serviceReq.save();
    return 
  }
};

module.exports = backendAsyncMethods;
