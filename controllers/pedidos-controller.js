const util = require('util')
const {Pedido} = require('../models')

class PedidosController {
  constructor(app) {
    this._app = app
  }

  async listar(req, res) {

    try {
      const pedidos = await Pedido.findAll()
      res.render('pedidos/listar', {pedidos: pedidos})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async novo(req, res) {
    const pedido = {}
    res.render("pedidos/form", {pedido})
  }

  async adicionar(req, res) {
    const pedido = req.body
    
    req.assert("cliente", "Nome é obrigatório").notEmpty()
    req.assert("telefone", "Telefone é obrigatório").notEmpty()
    req.assert("endereco", "Endereco é obrigatório").notEmpty()
    req.assert("cpf", "CPF é obrigatório").notEmpty()
    req.assert("pedido", "Pedido é obrigatório").notEmpty()
    req.assert("status")

    const erros = req.validationErrors()

    if (erros) {
      return res.render("pedidos/form", {erros, pedido})
    }

    try {
      await Pedido.create(pedido)
      res.redirect("/pedidos")
    } catch(err) {
      await res.render("form", {status: err}, pedido)
    }
  }

  async info(req, res) {
    const id = req.params.id

    try {
      const pedido = await Pedido.findByPk(id)
      res.render('pedidos/informacao', {pedido})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async excluir(req, res) {
    const id = req.params.id

    try {
      await Pedido.destroy({where: { id }})
      res.redirect('/pedidos')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async alterar(req, res) {
    const id = req.params.id
    const pedido = req.body

    try {
      await Pedido.update(pedido, {where: { id }})
      res.redirect('/pedidos')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }
}

module.exports = PedidosController