const CardapioController = require("../controllers/cardapio-controller");
const axios = require("axios");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/img");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname.toString());
  }
});

const upload = multer({ storage: storage }).single("image");

module.exports = app => {
  const controller = new CardapioController(app);

  app
    .route("/cardapio")
    .get(controller.listar.bind(controller))
    .post(upload, controller.adicionar.bind(controller));

  app.get("/cardapio/info/:id", controller.info.bind(controller));

  app
    .route("/cardapio/:id")
    .delete(controller.excluir.bind(controller))
    .put(controller.alterar.bind(controller));

  app
    .route("/cardapio-listados")
    .get(controller.listadosApenas.bind(controller));
};
