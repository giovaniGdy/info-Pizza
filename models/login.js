const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user: DataTypes.STRING,
      senha: DataTypes.STRING,
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      telefone: DataTypes.INTEGER,
      cpf: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      tableName: "usuarios",
      sequelize
    }
  );
  return Login;
};
