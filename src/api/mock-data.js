module.exports = (sequelize, Customer, Product, Invoice, InvoiceItem) => {
  sequelize.sync().then(() => {
    Customer.create({
      name: 'Mark Benson',
      address: '353 Rochester St, Rialto FL 43250',
      phone: '555-534-2342'
    });

    Customer.create({
      name: 'Bob Smith',
      address: '215 Market St, Dansville CA 94325',
      phone: '555-534-2342'
    });

    Customer.create({
      name: 'John Draper',
      address: '890 Main St, Fontana IL 31450',
      phone: '555-534-2342'
    });

    Product.create({
      name: 'Parachute Pants',
      price: 29.99
    });

    Product.create({
      name: 'Phone Holder',
      price: 9.99
    });

    Product.create({
      name: 'Pet Rock',
      price: 5.99
    });

    Product.create({
      name: 'Egg Timer',
      price: 15.99
    });

    Product.create({
      name: 'Neon Green Hat',
      price: 21.99
    });
    Invoice.create({
      customer_id: 1,
      discount: 10.0,
      total: 20.0
    });
    Invoice.create({
      customer_id: 2,
      discount: 10.0,
      total: 20.0
    });
    InvoiceItem.create({
      invoice_id: 1,
      quantity: 4,
      product_id: 1
    });
    InvoiceItem.create({
      invoice_id: 1,
      quantity: 6,
      product_id: 2
    });
    InvoiceItem.create({
      invoice_id: 1,
      quantity: 2,
      product_id: 4
    });
  }).catch((e) => {
    console.log('ERROR SYNCING WITH DB', e);
  });
};
