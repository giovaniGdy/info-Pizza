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

  async adicionar(req, res) {
    const itemFoto = req.body;
    
    console.log(itemFoto)

    for (let key of itemFoto.entries()) {
      console.log(key)
    } 

    const item = {
      nome: itemFoto.nome,
      preco: itemFoto.preco,
      descricao: itemFoto.descricao,
      imgUrl: itemFoto.imgUrl,
      status: itemFoto.status
    }

    // try {
    //   await Cardapio.create(item);
    //   res.json("S");
    // } catch (err) {
    //   res.json("Erro");
    // }

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
