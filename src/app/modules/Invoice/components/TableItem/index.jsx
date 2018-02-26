import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';
import 'react-select/dist/react-select.css';

export default class TableItem extends Component {
  static propTypes = {
    tableRow: PropTypes.object.isRequired,
    productOptions: PropTypes.array.isRequired,
    onPropertyDelete: PropTypes.func.isRequired,
    onPropertyChange: PropTypes.func.isRequired
  };

  onPropertyDelete() {
    const { tableRow } = this.props;
    this.props.onPropertyDelete(tableRow.id);
  }

  onPropertyChange(val) {
    const { onPropertyChange, tableRow } = this.props;
    tableRow.product_id = val.value;
    onPropertyChange(tableRow);
  }

  onQuantityChange(event) {
    const { onPropertyChange, tableRow } = this.props;
    tableRow.quantity = parseInt(event.target.value);
    onPropertyChange(tableRow);
  }

  render() {
    const { tableRow, productOptions } = this.props;
    let selectedItem = productOptions[0];
    productOptions.forEach((option) => {
      if (option.value === tableRow.product_id) {
        selectedItem = {
          value: option.value,
          label: option.label
        };
      }
    });

    return (
      <tr>
        <td>
          <Select name="form-field-name" value={selectedItem} options={productOptions}
            onChange={this.onPropertyChange.bind(this)}
          />
        </td>
        <td>
          <input
            type="text"
            className={classNames('form-control')}
            id="inputDiscount"
            placeholder="Quantity"
            value={tableRow.quantity}
            onChange={this.onQuantityChange.bind(this)}
          />
        </td>
        <td>
          <button type="button"
            className={classNames('btn', 'btn-success', 'btn-sm')}
            onClick={this.onPropertyDelete.bind(this)}>
            <i className={classNames('fa', 'fa-times-circle')} />
          </button>
        </td>
      </tr>
    );
  }
}
