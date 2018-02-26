// @flow
import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';

import {
  Row,
  Col,
  Button
} from 'react-bootstrap';
import * as _ from 'lodash';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import TableList from "../TableList";
import 'react-select/dist/react-select.css';

class InvoiceForm extends PureComponent {
  static propTypes = {
    invoice: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCustomerChange: PropTypes.func.isRequired,
    onDiscountChange: PropTypes.func.isRequired,
    onPropertyChange: PropTypes.func.isRequired,
    onPropertyAdd: PropTypes.func.isRequired,
    onPropertyDelete: PropTypes.func.isRequired,
    invoiceItems: PropTypes.array.isRequired,
    productOptions: PropTypes.array.isRequired,
    customerOptions: PropTypes.array.isRequired,
  };

  onDiscountChange = event => {
    const { onDiscountChange, invoice } = this.props;
    onDiscountChange(parseInt(event.target.value));
  }

  onCustomerChange = val => {
    const { onCustomerChange, invoice } = this.props;
    onCustomerChange(val.value);
  }

  render() {
    const {
      invoice,
      invoiceItems,
      productOptions,
      customerOptions,
      onPropertyChange,
      onSave,
      onPropertyAdd,
      onPropertyDelete,
    } = this.props;
    let selectedItem = customerOptions[0];
    if (invoice) {
      customerOptions.forEach((option) => {
        if (option.value === invoice.customer_id) {
          selectedItem = {
            value: option.value,
            label: option.label
          }
        }
      });
    }

    return (
      <div className={classNames('content')}>
        <Row>
          <Col md={8}>
            <form className={classNames('form-horizontal')} noValidate>
              <fieldset>
                <Row>
                  <Col md={5} xs={12}>
                    <div className={classNames('form-group')}>
                      <Col md={3}>
                        <label
                          htmlFor="inputCustomer"
                          className={classNames('control-label')}>
                          Customer
                        </label>
                      </Col>
                      <Col md={9}>
                        <Select id="inputCustomer" name="form-field-name" value={selectedItem} options={customerOptions}
                                onChange={this.onCustomerChange.bind(this)} />
                      </Col>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={5} xs={12}>
                    <div className={classNames('form-group')}>
                      <Col md={3}>
                        <label
                          htmlFor="inputDiscount"
                          className={classNames('control-label')}>
                          Discount,&nbsp;%
                        </label></Col>
                      <Col md={9}>
                        <input
                          type="text"
                          className={classNames('form-control')}
                          id="inputDiscount"
                          placeholder="Discount"
                          value={invoice ? invoice.discount : 0}
                          onChange={this.onDiscountChange.bind(this)}
                        />
                      </Col>
                    </div>
                  </Col>
                  <Col md={5} xs={12}>
                    <div className={classNames('form-group')}>
                      <Col md={3}>
                        <label
                          htmlFor="inputTotal"
                          className={classNames('control-label')}>
                          Total,&nbsp;$
                        </label>
                      </Col>
                      <Col md={9}>
                        <input
                          type="text"
                          className={classNames('form-control')}
                          id="inputTotal"
                          placeholder="Total cost,$"
                          value={invoice ? invoice.total : 0}
                          disabled
                        />
                      </Col>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <TableList
                      onPropertyDelete={onPropertyDelete}
                      onPropertyAdd={onPropertyAdd}
                      onPropertyChange={onPropertyChange}
                      productOptions={productOptions}
                      tableRows={invoiceItems} />
                  </Col>
                </Row>

                <div className={classNames('form-group')}>
                  <Col xs={2} xsOffset={10}>
                    <Link className={classNames('btn', 'btn-success', 'btn-sm')} to={'/'}>
                      <i className={classNames('fa', 'fa-save')}></i>&nbsp;Save
                    </Link>
                  </Col>
                </div>
              </fieldset>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InvoiceForm;
