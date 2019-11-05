const LoginController = require("../controllers/login-controller");

module.exports = app => {
  const controller = new LoginController(app);

  app
    .route("/login")
    .get(controller.userAlt.bind(controller))
//    .post(controller.cadastrar.bind(controller));

  app.route("/userAlt").post(
    controller.userAlt.bind(controller))
    .put(controller.alterar.bind(controller))

  app
    .route("/login/:id")
    .delete(controller.excluir.bind(controller))
    .put(controller.alterar.bind(controller));

  app.put("/logar", controller.logar.bind(controller));
};
