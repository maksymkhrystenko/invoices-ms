import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import 'react-select/dist/react-select.css';

export default class InvoicesTableItem extends Component {
  static propTypes = {
    tableRow: PropTypes.object.isRequired,
    customers: PropTypes.array.isRequired
  };

  render() {
    const { tableRow, customers } = this.props;
    if(tableRow&&customers) {
      customers.forEach((customer) => {
        if (customer.id === tableRow.customer_id) {
          tableRow.customer = customer.name;
        }
      });
    }
    return (
      <tr>
        <td>
          {tableRow.customer}
        </td>
        <td>
          {tableRow.discount}
        </td>
        <td>
          {tableRow.total}
        </td>
        <td>
          <Link className={classNames('btn', 'btn-success', 'btn-sm')}
            to={`/invoices/${tableRow.id}/edit`}>
            <i className={classNames('fa', 'fa-edit')} />
            &nbsp;
            Edit Invoice
          </Link>
        </td>
      </tr>
    );
  }
}
