const util = require("util");
const axios = require("axios");

const { Pedido } = require("../models");

class PedidosController {
  constructor(app) {
    this._app = app;
  }

  async listar(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      return res.json(pedidos);
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }

  async adicionar(req, res) {
    const pedido = req.body.pedido;

    try {
      const criar = await Pedido.create(pedido);
      res.json("S");
    } catch (err) {
      res.json("Erro");
    }
  }

  async info(req, res) {
    const id = req.params.id;

    try {
      const pedido = await Pedido.findByPk(id);
      res.json({ pedido });
    } catch (err) {
      res.json("Erro");
    }
  }

  async excluir(req, res) {
    const id = req.params.id;

    try {
      await Pedido.destroy({ where: { id } }).then(res.json("S"));
    } catch (err) {
      res.json("Erro");
    }
  }

  async alterar(req, res) {
    const id = req.params.id;
    const pedido = req.body.pedido;

    try {
      await Pedido.update(pedido, { where: { id } });
      res.json("S");
    } catch (err) {
      res.json(`Error: ${err}`);
    }
  }
}

module.exports = PedidosController;
