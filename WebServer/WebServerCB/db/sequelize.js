// db/sequelize.js
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DB_CLIENT, // 'postgres' | 'mysql' | 'mssql'
  logging: false,
  pool: { max: 10, min: 0, idle: 10000 }
});

// --- MODELOS ---
const Usuario = sequelize.define('Usuario', {
  Id_Usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Usuario: DataTypes.STRING,
  Correo: DataTypes.STRING,
  Contrasena: DataTypes.STRING,
  Activa: DataTypes.BOOLEAN,
  Fecha_Creacion: DataTypes.DATE
}, { tableName: 'tbl_Usuario', timestamps: false });

const Publicacion = sequelize.define('Publicacion', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Titulo: DataTypes.STRING,
  Id_Modelo: DataTypes.INTEGER,
  Kilometraje: DataTypes.INTEGER,
  Id_Transmision: DataTypes.INTEGER,
  Precio_Inicial: DataTypes.DECIMAL(12,2),
  Fecha_Inicio: DataTypes.DATE,
  Fecha_Fin: DataTypes.DATE,
  Id_Estado: DataTypes.INTEGER,
  Usuario_Grabacion: DataTypes.INTEGER
}, { tableName: 'tbl_Publicacion', timestamps: false });

const Puja = sequelize.define('Puja', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Id_Publicacion: DataTypes.INTEGER,
  Valor_a_Pujar: DataTypes.DECIMAL(12,2),
  Fecha_Grabacion: DataTypes.DATE,
  Usuario_Grabacion: DataTypes.INTEGER
}, { tableName: 'tbl_Puja', timestamps: false });

Publicacion.hasMany(Puja, { foreignKey: 'Id_Publicacion' });
Puja.belongsTo(Publicacion, { foreignKey: 'Id_Publicacion' });

module.exports = { sequelize, Sequelize, Usuario, Publicacion, Puja };
