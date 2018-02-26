/* eslint no-console:0 */
/* eslint consistent-return:0 */
import path from 'path';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.hot.reload.config';
import chalk from 'chalk';
import Sequelize from 'sequelize';

const app = express();
const compiler = webpack(config);
const PUBLIC = '../../';
const PORT = 3001;
const IP_ADRESS = 'localhost';
app.use(express.static(path.join(__dirname, PUBLIC)));

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(hotMiddleware(compiler));

const sequelize = new Sequelize('sqlite://' + path.join(__dirname, 'invoices.sqlite'), {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'invoices.sqlite')
});

const Customer = require('./modules/Customer/schemas')(sequelize);
const Product = require('./modules/Product/schemas')(sequelize);
const Invoice = require('./modules/Invoice/schemas')(sequelize).invoice;
const InvoiceItem = require('./modules/Invoice/schemas')(sequelize).invoiceItem;

require('./mock-data')(sequelize, Customer, Product, Invoice, InvoiceItem);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

require('./modules/Customer/routes')(app, Customer);
require('./modules/Product/routes')(app, Product);
require('./modules/Invoice/routes')(app, Invoice, InvoiceItem);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, PUBLIC, 'index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log(`
    =====================================================
    -> Server Hot reload (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    =====================================================
  `);
});



