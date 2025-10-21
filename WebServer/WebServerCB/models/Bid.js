// models/Bid.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/sequelize');
const Auction = require('./Auction');
const User = require('./User');

class Bid extends Model {}
Bid.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  auction_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  bidder_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  amount: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
}, { sequelize, modelName: 'bid' });

Bid.belongsTo(Auction, { foreignKey: 'auction_id' });
Bid.belongsTo(User, { as: 'bidder', foreignKey: 'bidder_id' });

module.exports = Bid;
