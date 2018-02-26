import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import update from 'immutability-helper';

import InvoiceEditView from '../components/InvoiceEditView';
import AnimatedView from '../../../common/components/animatedView/AnimatedView';
import q from '../queries';
import { getTotal } from '../../../common/helpers';

class InvoiceEdit extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    productOptions: [],
    products: [],
    isEdit: false,
    customerOptions: [],
    invoice: null,
    invoiceItems: []
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const isEdit = !!id;
    let invoice = null;
    let invoiceItems = [];
    const queryReguests = [q.customers.get(), q.products.get()];
    if (isEdit) {
      queryReguests.push(q.invoice.get({ invoice_id: id }));
      queryReguests.push(q.invoiceItems.get({ invoice_id: id }));
    } else {
      const result = await q.invoice.post({ invoice_id: id }, {
        customer_id: 1,
        discount: 0,
        total: 0
      });
      invoice = result.data;
    }
    const results = await Promise.all(queryReguests);
    const [{ data: customers }, { data: products }] = results;
    if (isEdit) {
      [, , { data: invoice }, { data: invoiceItems }] = results;
    }
    const customerOptions = customers ? customers.map((customer) => {
      return {
        value: customer.id,
        label: customer.name
      };
    }) : [];
    const productOptions = products ? products.map((product) => {
      return {
        value: product.id,
        label: product.name
      };
    }) : [];
    this.setState({
      customerOptions,
      productOptions,
      products,
      invoice,
      invoiceItems,
      isEdit
    });
  }

  async onPropertyAdd() {
    let { invoiceItems, invoice } = this.state;
    const result = await q.invoiceItems.post({ invoice_id: invoice.id }, { product_id: 1, quantity: 0 });
    invoiceItems = update(invoiceItems, {
      $push: [{
        id: result.data.id,
        product_id: result.data.product_id,
        quantity: result.data.quantity
      }]
    });
    this.setState({
      invoiceItems
    });
  }

  async onPropertyDelete(invoiceItemId) {
    const { invoiceItems, invoice, products } = this.state;
    const result = await q.invoiceItems.delete({ invoice_id: invoice.id, id: invoiceItemId });
    invoice.total = getTotal(invoiceItems.filter(t => t.id !== result.data.id), invoice, products).toFixed(2);
    this.setState({ invoice, invoiceItems: invoiceItems.filter(t => t.id !== result.data.id) });
  }

  async onPropertyChange(property) {
    let { invoiceItems, invoice, products } = this.state;
    const itemIndex = _.indexOf(invoiceItems, _.find(invoiceItems, { id: property.id }));
    const result = await q.invoiceItems.put({ invoice_id: invoice.id, id: property.id }, {
      product_id: property.product_id,
      quantity: property.quantity
    });
    const updatedInvoiceItem = update(invoiceItems[itemIndex], {
      product_id: { $set: result.data.product_id },
      quantity: { $set: result.data.quantity }
    });
    invoiceItems = update(invoiceItems, {
      $splice: [[itemIndex, 1, updatedInvoiceItem]]
    });
    invoice.total = getTotal(invoiceItems, invoice, products).toFixed(2);
    await q.invoice.put({ invoice_id: invoice.id }, {
      total: parseFloat(invoice.total)
    });
    this.setState({ invoiceItems, invoice });
  }

  async onCustomerChange(customer_id) {
    let { invoice } = this.state;
    const result = await q.invoice.put({ invoice_id: invoice.id }, { customer_id });
    invoice = update(invoice, {
      customer_id: { $set: result.data.customer_id }
    });
    this.setState({ invoice });
  }

  async onDiscountChange(discount) {
    let { invoiceItems, invoice, products } = this.state;
    invoice.total = getTotal(invoiceItems, invoice, products).toFixed(2);
    const result = await q.invoice.put({ invoice_id: invoice.id }, { discount, total: parseFloat(invoice.total) });
    invoice = update(invoice, {
      discount: { $set: result.data.discount },
      total: { $set: result.data.total }
    });
    this.setState({ invoice });
  }

  async onSave() {
    const { invoice } = this.state;
    await q.invoice.put({ invoice_id: invoice.id }, { total: parseFloat(invoice.total) });
  }

  render() {
    const { customerOptions, productOptions, invoiceItems, invoice } = this.state;
    return (
      <AnimatedView>
        <InvoiceEditView
          invoiceItems={invoiceItems}
          invoice={invoice}
          productOptions={productOptions}
          customerOptions={customerOptions}
          onPropertyAdd={this.onPropertyAdd.bind(this)}
          onSave={this.onSave.bind(this)}
          onPropertyDelete={this.onPropertyDelete.bind(this)}
          onPropertyChange={this.onPropertyChange.bind(this)}
          onDiscountChange={this.onDiscountChange.bind(this)}
          onCustomerChange={this.onCustomerChange.bind(this)}
        />
      </AnimatedView>
    );
  }
}

export default InvoiceEdit;

