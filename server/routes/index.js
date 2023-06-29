const { identify } = require("../controller/identify.controller");

module.exports = (app) => {
  app.post(
    "/identify",
    identify
  );
};
