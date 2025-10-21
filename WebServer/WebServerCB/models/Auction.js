// models/Auction.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');
const User = require('./User');

class Auction extends Model {}
Auction.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  seller_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  title: { type: DataTypes.STRING(160), allowNull: false },
  brand: { type: DataTypes.STRING(60), allowNull: false },
  model: { type: DataTypes.STRING(60), allowNull: false },
  year: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
  km: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
  transmission: { type: DataTypes.ENUM('Automática','Manual','CVT'), allowNull: false },
  base_price: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  start_at: { type: DataTypes.DATE, allowNull: false },
  end_at: { type: DataTypes.DATE, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('scheduled','active','closed','canceled'), defaultValue: 'scheduled' },
  highest_bid: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 }
}, { sequelize, modelName: 'auction' });

Auction.belongsTo(User, { as: 'seller', foreignKey: 'seller_id' });

module.exports = Auction;
