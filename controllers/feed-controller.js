const util = require('util')
const {Feed} = require('../models')

class FeedController {
  constructor(app) {
    this._app = app
  }

  async listar(req, res) {
    try {
      const posts = await Feed.findAll()
      res.render('feed/listar', {posts: posts})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async novo(req, res) {
    const posts = {}
    res.render("feed/adicionar", {posts})
  }

  async adicionar(req, res) {
    const posts = req.body
    
    req.assert("titulo", "Título é obrigatório").notEmpty()

    const erros = req.validationErrors()

    if (erros) {
      return res.render("feed/adicionar", {erros, posts})
    }

    try {
      await Feed.create(posts)
      res.redirect("/feed")
    } catch(err) {
      await res.render("form", {status: err}, posts)
    }
  }

  async info(req, res) {
    const id = req.params.id

    try {
      const posts = await Feed.findByPk(id)
      res.render('feed/visualizar', {posts})
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async excluir(req, res) {
    const id = req.params.id

    try {
      await Feed.destroy({where: { id }})
      res.redirect('/feed')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }

  async alterar(req, res) {
    const id = req.params.id
    const posts = req.body

    try {
      await Feed.update(posts, {where: { id }})
      res.redirect('/feed')
    } catch(err) {
      res.status(500).end(`Error: ${err}`)
    }
  }
}

module.exports = FeedController