import _ from 'lodash';

module.exports = (app, Invoice, InvoiceItem) => {
  // INVOICES API
  app.route('/api/invoices')
    .get((req, res) => {
      Invoice.findAll().then((invoices) => {
        res.json(invoices);
      })
    })
    .post((req, res) => {
      const invoice = Invoice.build(_.pick(req.body, ['customer_id', 'discount', 'total']));
      invoice.save().then((invoice) => {
        res.json(invoice);
      });
    });

  app.route('/api/invoices/:invoice_id')
    .get((req, res) => {
      Invoice.findById(req.params.invoice_id).then((invoice) => {
        res.json(invoice);
      });
    })
    .put((req, res) => {
      Invoice.findById(req.params.invoice_id).then((invoice) => {
        invoice.update(_.pick(req.body, ['customer_id', 'discount', 'total'])).then((invoice) => {
          res.json(invoice);
        });
      });
    })
    .delete((req, res) => {
      Invoice.find({ id: req.params.invoice_id }).then((invoice) => {
        invoice.destroy().then((invoice) => {
          res.json(invoice);
        });
      });
    });


// INVOICE ITEMS API

  app.route('/api/invoices/:invoice_id/items')
    .get((req, res) => {
      InvoiceItem.findAll({ where: { invoice_id: req.params.invoice_id } }).then((invoice_items) => {
        res.json(invoice_items);
      })
    })
    .post((req, res) => {
      const invoice_item = InvoiceItem.build(_.pick(req.body, ['product_id', 'quantity']));
      invoice_item.set('invoice_id', parseInt(req.params.invoice_id));
      invoice_item.save().then((invoice_item) => {
        res.json(invoice_item);
      });
    });

  app.route('/api/invoices/:invoice_id/items/:id')
    .get((req, res) => {
      InvoiceItem.findById(req.params.id).then((invoice_item) => {
        res.json(invoice_item);
      });
    })
    .put((req, res) => {
      InvoiceItem.findById(req.params.id).then((invoice_item) => {
        invoice_item.update(_.pick(req.body, ['product_id', 'quantity'])).then((invoice_item) => {
          res.json(invoice_item);
        });
      });
    })
    .delete((req, res) => {
      InvoiceItem.findById(req.params.id).then((invoice_item) => {
        invoice_item.destroy().then((invoice_item) => {
          res.json(invoice_item);
        });
      });
    });
};




