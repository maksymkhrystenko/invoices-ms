export const getTotal = (invoiceItems, invoice, products) => {
  let total = 0;
  invoiceItems.forEach((invoiceItem) => {
    products.forEach((product) => {
      if (product.id === invoiceItem.product_id) {
        console.log(7777);
        console.log(product.price);
        console.log(invoiceItem.quantity);
        console.log(invoice.discount);
        console.log(total);
        total = total + (product.price * invoiceItem.quantity) * (100 - invoice.discount) / 100;
        console.log(total);
      }
    })
  });
  return total;
}
