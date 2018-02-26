import _ from 'lodash';

module.exports = (app, Product) => {
  // PRODUCTS API

  app.route('/api/products')
    .get((req, res) => {
      Product.findAll().then((products) => {
        res.json(products);
      })
    })
    .post((req, res) => {
      const product = Product.build(_.pick(req.body, ['name', 'price']));
      product.save().then((product) => {
        res.json(product);
      });
    });

  app.route('/api/products/:product_id')
    .get((req, res) => {
      Product.find({ id: req.params.product_id }).then((product) => {
        res.json(product);
      });
    })
    .put((req, res) => {
      Product.find({ id: req.params.product_id }).then((product) => {
        product.update(_.pick(req.body, ['name', 'price'])).then((product) => {
          res.json(product);
        });
      });
    })
    .delete((req, res) => {
      Product.find({ id: req.params.product_id }).then((product) => {
        product.destroy().then((product) => {
          res.json(product);
        });
      });
    });
};




