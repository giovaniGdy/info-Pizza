const util = require("util");
const { User } = require("../models");

class LoginController {
  constructor(app) {
    this._app = app;
  }

  async loginScreen(req, res) {
    try {
      const user = {};
      res.render("users/login", { user });
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }

  async novo(req, res) {
    const user = {};
    res.render("users/cadastroForm", { user });
  }

  async cadastrar(req, res) {
    const user = req.body;

    req.assert("user", "Nome de usuário é obrigatório").notEmpty();
    req.assert("senha", "Senha é obrigatório").notEmpty();
    req.assert("nome", "Nome é obrigatório").notEmpty();
    req.assert("endereco", "Endereço é obrigatório").notEmpty();
    req.assert("telefone", "Telefone é obrigatório").notEmpty();
    req.assert("cpf", "CPF é obrigatório").notEmpty();
    req.assert("type");

    const erros = req.validationErrors();

    if (erros) {
      return res.render("users/cadastroForm", { erros, user });
    }

    try {
      await User.create(user);
      res.redirect("/");
    } catch (err) {
      await res.render("form", { status: err }, user);
    }
  }

  async logar(req, res) {
    const userPass = req.body.usuario.senha;
    const userName = req.body.usuario.username;

    const loginConfirmation = ["ACCESS_GRANTED_USER_PERMITED", userName, userPass]

    console.log(req.body.usuario);

    try {
      await User.findOne({ where: { user: userName } }).then(data => {
        if (data === null) {
          res.json("Invalido");
        }
        if (userName === data.user && userPass === data.senha) {
          res.json(loginConfirmation);
        } else {
          res.json("Invalido");
        }
      });
    } catch (err) {
      return res.status(500).end(`Error: ${err}`);
    }
  }

  async excluir(req, res) {
    const id = req.params.id;

    try {
      await user.destroy({ where: { id } });
      res.redirect("/");
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }

  async alterar(req, res) {
    const id = req.params.id;
    const user = req.body;

    try {
      await User.update(user, { where: { id } });
      res.redirect("/");
    } catch (err) {
      res.status(500).end(`Error: ${err}`);
    }
  }
}

module.exports = LoginController;
