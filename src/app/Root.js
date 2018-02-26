// @flow weak

import React, {
  Component
} from 'react';
import {
  Switch,
  BrowserRouter
} from 'react-router-dom';
import App from './App';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <App />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
