const util = require('util')
const {Cardapio} = require('../models')

class CardapioController {
  constructor(app) {
    this._app = app
  }

  async listar(req, res) {
    try {
      const items = await Cardapio.findAll()
      res.render('cardapio/listar', {cardapio: items})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async novo(req, res) {
    const items = {}
    res.render("cardapio/adicionar", {items})
  }

  async adicionar(req, res) {
    const items = req.body
    
    req.assert("nome", "Nome é obrigatório").notEmpty()
    req.assert("preco", "Preço é obrigatório").notEmpty()
    req.assert("descricao", "Descrição é obrigatória").notEmpty()
    req.assert("imgUrl")
    req.assert("status")
   
    const erros = req.validationErrors()

    if (erros) {
      return res.render("cardapio/adicionar", {erros, items})
    }

    try {
      await Cardapio.create(items)
      res.redirect("/cardapio")
    } catch(err) {
      await res.render("form", {status: err}, items)
    }
  }

  async info(req, res) {
    const id = req.params.id

    try {
      const item = await Cardapio.findByPk(id)
      res.render('cardapio/informacao', {item})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async excluir(req, res) {
    const id = req.params.id

    try {
      await Cardapio.destroy({where: { id }})
      res.redirect('/cardapio')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async alterar(req, res) {
    const id = req.params.id
    const item = req.body

    try {
      await Cardapio.update(item, {where: { id }})
      res.redirect('/cardapio')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }
}

module.exports = CardapioController