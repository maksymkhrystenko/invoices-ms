import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import InvoicesTableItem from '../InvoicesTableItem';

export default class InvoicesTableList extends Component {
  render() {
    const { tableRows, customers } = this.props;
    const propertiesList = [];
    if (tableRows && tableRows.length > 0) {
      tableRows.forEach((tableRow) => {
        propertiesList.push(<InvoicesTableItem key={tableRow.id}
          tableRow={tableRow}
          customers={customers} />);
      });
    }
    return (
      <div>
        <table className={classNames('table', 'table-striped', 'table-hover')}>
          <thead>
            <tr>
              <th className={classNames('col-md-6')}>Customer</th>
              <th>Discount, %</th>
              <th>Total, $</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{propertiesList}</tbody>
        </table>
      </div>
    );
  }
}

InvoicesTableList.propTypes = {
  tableRows: PropTypes.array.isRequired,
  customers: PropTypes.array.isRequired
};
