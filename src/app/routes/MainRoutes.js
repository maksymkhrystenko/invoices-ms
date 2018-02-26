// @flow weak

import React from 'react';
import {
  Route,
  Switch
} from 'react-router';
import Invoice from '../modules/Invoice/containers/Invoice';
import InvoiceEdit from '../modules/Invoice/containers/InvoiceEdit';
import PageNotFound from "../modules/PageNotFound/containers/PageNotFound";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Invoice} />
      <Route exact path="/invoices/add" component={InvoiceEdit} />
      <Route exact path="/invoices/:id/edit" component={InvoiceEdit} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MainRoutes;
