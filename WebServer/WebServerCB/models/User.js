// models/User.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');   // <- SIN { }

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.ENUM('buyer','seller','admin'), defaultValue: 'seller' },
  },
  {
    sequelize,                     // <- AQUÍ VA LA INSTANCIA
    modelName: 'user'
  }
);

module.exports = User;
