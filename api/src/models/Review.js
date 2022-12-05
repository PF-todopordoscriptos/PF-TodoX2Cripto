const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    stars: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    text:{
        type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};