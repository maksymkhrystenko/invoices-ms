// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Toolbox } from '../../../common/components';
import InvoicesTableList from '../components/InvoicesTableList';
import { Link } from 'react-router-dom';
import AnimatedView from '../../../common/components/animatedView/AnimatedView';
import styles from './styles.scss';
import q from '../queries';
import { getTotal } from '../../../common/helpers';

class Invoice extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  state = {
    invoices: [],
    customers: []
  };

  async componentDidMount() {
    const results = await Promise.all([q.invoices.get(), q.customers.get()]);
    this.setState({
      invoices: results[0].data,
      customers: results[1].data
    });
  }

  async onPropertyDelete(invoiceItemId) {
    const { invoiceItems, invoice, products } = this.state;
    const result = await q.invoiceItems.delete({ invoice_id: invoice.id, id: invoiceItemId });
    invoice.total = getTotal(invoiceItems.filter(t => t.id !== result.data.id), invoice, products).toFixed(2);
    this.setState({ invoice, invoiceItems: invoiceItems.filter(t => t.id !== result.data.id) });
  }

  render() {
    const { invoices, customers } = this.state;
    return (
      <AnimatedView>
        <Toolbox>
          <Link className={classNames('btn', 'btn-success', 'btn-sm')}
            to={'/invoices/add'}>
            <i className={classNames('fa', 'fa-plus')} />
            &nbsp;
            Add Invoice
          </Link>
        </Toolbox>
        <div className={styles.homeInfo}>
          <h1 className={styles.mainTitle}>
            List of invoices
          </h1>
          <InvoicesTableList tableRows={invoices} customers={customers} />
        </div>
      </AnimatedView>
    );
  }
}

export default Invoice;
