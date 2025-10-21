// app.js
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { sequelize, initDb } = require('./db/sequelize'); // ⬅️ toma la instancia desde db/sequelize

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// Si ya creaste la ruta de publicaciones/auctions, descomenta la línea siguiente:
// const auctionsRouter = require('./routes/auctions');

const app = express();

/* =======================
   DB INIT
   ======================= */
(async () => {
  try {
    await initDb();          // autentica
    await sequelize.sync();  // en prod usa migraciones
    console.log('DB OK');
  } catch (e) {
    console.error('DB error:', e);
  }
})();

/* =======================
   VIEW ENGINE
   ======================= */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* =======================
   MIDDLEWARES
   ======================= */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// estáticos públicos
app.use(express.static(path.join(__dirname, 'public')));

// sirve archivos subidos (si usas uploads)
app.use(
  '/uploads',
  express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads'))
);

/* =======================
   ROUTES
   ======================= */
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/api/auctions', auctionsRouter); // ⬅️ descomenta si tienes la ruta

/* =======================
   ERROR HANDLING
   ======================= */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
