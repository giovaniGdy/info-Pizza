const util = require("util");
const { Feed } = require("../models");

class FeedController {
  constructor(app) {
    this._app = app;
  }

  async listar(req, res) {
    try {
      const posts = await Feed.findAll({ order: [["id", "DESC"]] });
      res.json(posts);
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }

  async adicionar(req, res) {
    const post = req.body.post;

    try {
      await Feed.create(post);
      res.json("S");
    } catch (err) {
      res.json("Erro");
    }
  }

  async info(req, res) {
    const id = req.params.id;

    try {
      const post = await Feed.findByPk(id);
      res.json({ post });
    } catch (err) {
      res.json(`Erro`);
    }
  }

  async excluir(req, res) {
    const id = req.params.id;

    try {
      await Feed.destroy({ where: { id } });
      res.json("S");
    } catch (err) {
      res.json(`Erro`);
    }
  }

  async alterar(req, res) {
    const id = req.params.id;
    const posts = req.body.post;

    try {
      await Feed.update(posts, { where: { id } });
      res.json("S");
    } catch (err) {
      res.json(`Error`);
    }
  }
}

module.exports = FeedController;
