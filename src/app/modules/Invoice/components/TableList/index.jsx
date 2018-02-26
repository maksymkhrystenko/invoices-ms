import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TableItem from '../TableItem';

export default class TableList extends Component {
  render() {
    const { tableRows, productOptions, onPropertyChange, onPropertyDelete, onPropertyAdd } = this.props;
    const propertiesList = [];
    if (tableRows && productOptions) {
      tableRows.forEach((tableRow) => {
        propertiesList.push(<TableItem key={tableRow.id}
          tableRow={tableRow}
          productOptions={productOptions}
          onPropertyDelete={onPropertyDelete.bind(this)}
          onPropertyChange={onPropertyChange.bind(this)} />);
      });
    }
    return (
      <div>
        <table className={classNames('table', 'table-striped', 'table-hover')}>
          <thead>
            <tr>
              <th className={classNames('col-md-6')}>Product</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{propertiesList}</tbody>
        </table>
        <div className={classNames('col-md-12')}>
          <button type="button" className={classNames('btn', 'btn-success', ' btn-sm')}
            onClick={onPropertyAdd.bind(this)}>
            <i className={classNames('fa', 'fa-plus')} /> &nbsp; Add product
          </button>
        </div>
      </div>
    );
  }
}

TableList.propTypes = {
  tableRows: PropTypes.array.isRequired,
  productOptions: PropTypes.array.isRequired,
  onPropertyAdd: PropTypes.func.isRequired,
  onPropertyDelete: PropTypes.func.isRequired,
  onPropertyChange: PropTypes.func.isRequired
};
