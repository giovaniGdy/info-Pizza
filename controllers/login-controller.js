const util = require("util");
const { User } = require("../models");

class LoginController {
  constructor(app) {
    this._app = app;
  }

  async userAlt(req, res) {
    const userPass = req.body.usuario.senha;
    const userName = req.body.usuario.username;

    try {
      await User.findOne({ where: { user: userName } }).then(data => {
        if (data === null) {
          res.json("Invalido");
        } else if (userName === data.user && userPass === data.senha) {
          const userData = data
          res.json(userData);
        } else {
          res.json("Invalido");
        }
      });
    } catch (err) {
      return res.status(500).end(`Error: ${err}`);
    }
  }

  // async cadastrar(req, res) {
  //   const user = req.body;

  //   try {
  //     await User.create(user);
  //     res.redirect("/");
  //   } catch (err) {
  //     await res.render("form", { status: err }, user);
  //   }
  // }

  async logar(req, res) {
    const userPass = req.body.usuario.senha;
    const userName = req.body.usuario.username;

    const loginConfirmation = [
      "ACCESS_GRANTED_USER_PERMITED",
      userName,
      userPass
    ];

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
    const user = req.body.newUserData
    const userId = req.body.newUserData.id

    try {
      const r = await User.update(user, { where: { id: userId } });
      res.json(r);
    } catch (err) {
      res.json(`Erro ${err}`);
    }
  }
}

module.exports = LoginController;
