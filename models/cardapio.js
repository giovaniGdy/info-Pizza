const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Cardapio = sequelize.define(
    "Cardapio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: DataTypes.STRING,
      preco: DataTypes.DOUBLE,
      descricao: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      tableName: "cardapio",
      sequelize
    }
  );
  return Cardapio;
};
