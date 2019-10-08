const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define(
    "Pedido",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cliente: DataTypes.STRING,
      telefone: DataTypes.INTEGER,
      endereco: DataTypes.STRING,
      cpf: DataTypes.INTEGER,
      pedido: DataTypes.STRING,
      status: DataTypes.STRING
    },
    {
      tableName: "pedido",
      sequelize
    }
  );
  return Pedido;
};
