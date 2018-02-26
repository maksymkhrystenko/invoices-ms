import _ from 'lodash';

module.exports = (app, Customer) => {
  // CUSTOMERS API
  app.route('/api/customers')
    .get((req, res) => Customer.findAll().then((customers) => res.json(customers)))
    .post((req, res) => {
      const customer = Customer.build(_.pick(req.body, ['name', 'address', 'phone']));
      customer.save().then((customer) => {
        res.json(customer);
      });
    });

  app.route('/api/customers/:customer_id')
    .get((req, res) => Customer.findById(req.params.customer_id).then((customer) => res.json(customer)))
    .put((req, res) => {
      Customer.findById(req.params.customer_id).then((customer) => {
        customer.update(_.pick(req.body, ['name', 'address', 'phone'])).then((customer) => {
          res.json(customer);
        });
      });
    })
    .delete((req, res) => {
      Customer.findById(req.params.customer_id).then((customer) => {
        customer.destroy().then((customer) => {
          res.json(customer);
        });
      });
    });
};


