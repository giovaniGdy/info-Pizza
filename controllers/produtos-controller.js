const util = require('util')
const {Produto} = require('../models')

class ProdutosController {
  constructor(app) {
    this._app = app
  }

  async listar(req, res) {

    try {
      const produtos = await Produto.findAll()
      res.render('produtos/listar', {produtos: produtos})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async novo(req, res) {
    const produto = {}
    res.render("produtos/form", {produto})
  }

  async adicionar(req, res) {
    const produto = req.body

    req.assert("nome", "Nome é obrigatório").notEmpty()
    req.assert("preco", "Preço é obrigatório").notEmpty()

    const erros = req.validationErrors()

    if (erros) {
      return res.render("produtos/form", {erros, produto})
    }
    
    try {
      await Produto.create(produto)
      res.redirect("/produtos")
    } catch(err) {
      res.render("form", {status: err}, produto)
    }  
  }

  async editar(req, res) {
    const id = req.params.id

    try {
      const produtos = await Produto.findByPk(id)
      res.render('produtos/form', {produto: produtos[0]})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async excluir(req, res) {
    const id = req.params.id

    try {
      await Produto.destroy({where: { id }})
      res.redirect('/produtos')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async alterar(req, res) {
    const id = req.params.id
    const produto = req.body

    try {
      await Produto.update(produto, {where: { id }})
      res.redirect('/produtos')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

}

module.exports = ProdutosController