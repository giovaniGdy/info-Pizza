const util = require("util");
const { User } = require("../models");

const senhaAdministrator = "admin";
const userAdministrator = "admin";

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
    const userPass = req.body.senha;
    const user = req.body.user;

    req.assert("user", "Nome de usuário é obrigatório").notEmpty();
    req.assert("senha", "Senha é obrigatório").notEmpty();

    const erros = req.validationErrors();

    if (erros) {
      return res.render("users/login", { erros, user });
    }

    try {
      await User.findOne({ where: { user } }).then(data => {
          if (user === data.user && userPass == data.senha) {
            res.redirect("/");
          } else {
            res.render("users/login", { erros, user })
          }
      });
    } catch (err) {
      res.status(500).end(`${err}`);
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
