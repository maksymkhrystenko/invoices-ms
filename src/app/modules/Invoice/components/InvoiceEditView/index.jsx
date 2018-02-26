import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import InvoiceForm from '../InvoiceForm';
import { Toolbox } from '../../../../common/components';

const InvoiceEditView = props => {
  return (
    <div>
      <Toolbox>
        <Link className={classNames('btn', 'btn-success', 'btn-sm')} to={'/'}>
          <i className={classNames('fa', 'fa-backward')} /> &nbsp; Back
        </Link>
      </Toolbox>
      <div>
        <h1>{props.invoice ? 'Edit' : 'Add'} Invoice</h1>
        <InvoiceForm {...props} />
      </div>
    </div>
  );
};

InvoiceEditView.propTypes = {
  invoice: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onCustomerChange: PropTypes.func.isRequired,
  onDiscountChange: PropTypes.func.isRequired,
  onPropertyChange: PropTypes.func.isRequired,
  onPropertyAdd: PropTypes.func.isRequired,
  onPropertyDelete: PropTypes.func.isRequired,
  invoiceItems: PropTypes.array.isRequired,
  productOptions: PropTypes.array.isRequired,
  customerOptions: PropTypes.array.isRequired
};

export default InvoiceEditView;
