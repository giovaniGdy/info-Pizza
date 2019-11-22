const { Cardapio } = require("../models");

class CardapioController {
  constructor(app) {
    this._app = app;
  }

  async listar(req, res) {
    try {
      const items = await Cardapio.findAll();
      res.json(items);
    } catch (err) {
      res.json(`Error: ${err}`);
    }
  }

  async listadosApenas(req, res) {
    const listado = "Listado"

    try {
      const items = await Cardapio.findAll( { where: {status: listado}} );
      res.json(items);
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }

  async adicionar(req, res) {
    const itemFoto = req.body;
        
    const item = {
      nome: itemFoto.nome,
      preco: itemFoto.preco,
      descricao: itemFoto.descricao,
      imgUrl: req.file.originalname,
      status: itemFoto.status
    }

    try {
       await Cardapio.create(item);
       res.json("S");
     } catch (err) {
       res.json("Erro");
    }

  }

  async info(req, res) {
    const id = req.params.id;

    try {
      const item = await Cardapio.findByPk(id);
      res.json({ item });
    } catch (err) {
      res.json(`Erro: ${err}`);
    }
  }

  async excluir(req, res) {
    const id = req.params.id;

    try {
      await Cardapio.destroy({ where: { id } });
      res.json("S");
    } catch (err) {
      res.json(`Erro: ${err}`);
    }
  }

  async alterar(req, res) {
    const id = req.params.id;
    const item = req.body.item;

    try {
      await Cardapio.update(item, { where: { id } });
      res.json("S");
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }
}

module.exports = CardapioController;
