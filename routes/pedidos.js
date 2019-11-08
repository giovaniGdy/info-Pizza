const PedidosController = require("../controllers/pedidos-controller");

module.exports = app => {
  const controller = new PedidosController(app);

  app
    .route("/pedidos")
    .get(controller.listar.bind(controller))
    .post(controller.adicionar.bind(controller));

  app.get("/pedidos/info/:id", controller.info.bind(controller));

  app
    .route("/pedidos/:id")
    .delete(controller.excluir.bind(controller))
    .put(controller.alterar.bind(controller));

  app
   .route("/dadosPedido")
   .put(controller.dadosPedido.bind(controller));
};
