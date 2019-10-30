const CardapioController = require("../controllers/cardapio-controller");

module.exports = app => {
  const controller = new CardapioController(app);

  app
    .route("/cardapio")
    .get(controller.listar.bind(controller))
    .post(controller.adicionar.bind(controller));

  app.get("/cardapio/info/:id", controller.info.bind(controller));

  app
    .route("/cardapio/:id")
    .delete(controller.excluir.bind(controller))
    .put(controller.alterar.bind(controller));
};
