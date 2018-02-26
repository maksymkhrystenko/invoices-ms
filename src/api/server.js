// @flow
import Sequelize from 'sequelize';
const express = require('express');
const path = require('path');
const chalk = require('chalk');
import bodyParser from 'body-parser';

const app = express();
const PUBLIC = '../../public';
const PORT = 8082;
const IP_ADRESS = 'localhost';

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


app.use(express.static(path.join(__dirname, PUBLIC)));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, PUBLIC, 'index.html')));

/* eslint-disable no-console */
app.listen(
  PORT,
  err => {
    if (err) {
      return console.error(err);
    }
    console.log(`
    =====================================================
    -> Server (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    =====================================================
  `);
  }
);
/* eslint-enable no-console */
