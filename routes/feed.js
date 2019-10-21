const FeedController = require("../controllers/feed-controller")

module.exports = (app) => {

	const controller = new FeedController(app)

	app.route("/feed")
		.get(controller.listar.bind(controller))
		.post(controller.adicionar.bind(controller))

	app.get("/feed/novo", controller.novo.bind(controller))

	app.get("/feed/info/:id", controller.info.bind(controller))

	app.route("/feed/:id")
		.delete(controller.excluir.bind(controller))
		.put(controller.alterar.bind(controller))
}