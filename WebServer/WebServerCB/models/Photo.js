// models/Photo.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');
const Auction = require('./Auction');

class Photo extends Model {}
Photo.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  auction_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  url: { type: DataTypes.STRING(255), allowNull: false },
  order: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 0 }
}, { sequelize, modelName: 'photo' });

Photo.belongsTo(Auction, { foreignKey: 'auction_id' });

module.exports = Photo;
