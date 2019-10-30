const LoginController = require("../controllers/login-controller");

module.exports = app => {
  const controller = new LoginController(app);

  app
    .route("/login")
    .get(controller.loginScreen.bind(controller))
    .post(controller.cadastrar.bind(controller));

  app.get("/login/novo", controller.novo.bind(controller));

  app
    .route("/login/:id")
    .delete(controller.excluir.bind(controller))
    .put(controller.alterar.bind(controller));

  app.put("/logar", controller.logar.bind(controller));
};
