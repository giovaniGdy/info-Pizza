const SiteController = require("../controllers/site-controller")

module.exports = (app) => {

	const controller = new SiteController(app)

	app.route("/home")
		.get(controller.carregar.bind(controller))

}