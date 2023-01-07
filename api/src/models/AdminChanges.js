const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("AdminChanges", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idAdmin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAdmin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idUser: {
      type: DataTypes.STRING,
      allowNull: true
    },
    emailUser: {
      type: DataTypes.STRING,
      allowNull: true
    },
    idCoin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nameCoin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dataModified: {
      type: DataTypes.STRING,
      allowNull: false
    },
    newValue: {
      type: DataTypes.STRING,
      allowNull: false
    }},
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false
    }
  )
}
