const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Feed = sequelize.define(
    "Feed",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
    },
    {
      tableName: "feed",
      sequelize
    }
  );
  return Feed;
};
