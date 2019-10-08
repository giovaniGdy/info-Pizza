const util = require("util");
const { Site } = require("../models");

class SiteController {
  constructor(app) {
    this._app = app;
  }

  async carregar(req, res) {
    try {
      res.render("site/index");
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }

}
module.exports = SiteController;
