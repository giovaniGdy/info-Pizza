const CardapioController = require("../controllers/cardapio-controller");
const multer = require('multer')
const upload = multer({ dest: '/public/img/' })

module.exports = app => {
  const controller = new CardapioController(app);

  app
    .route("/cardapio")
    .get(controller.listar.bind(controller))
    .post(upload.single('imgUrl'), controller.adicionar.bind(controller));
    
  app
    .route("/cardapio/:id")
    .delete(controller.excluir.bind(controller))
    .put(controller.alterar.bind(controller));
};
