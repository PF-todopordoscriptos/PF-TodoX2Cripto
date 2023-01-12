const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://res.cloudinary.com/dpb5vf1q1/image/upload/v1672942978/dinox_pic_mkcd4k.png",
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
