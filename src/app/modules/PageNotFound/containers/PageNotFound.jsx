// @flow weak

import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import AnimatedView from '../../../common/components/animatedView/AnimatedView';

class PageNotFound extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <AnimatedView>
        <h1>
          404. Page does not exists...
        </h1>
      </AnimatedView>
    );
  }
}

export default PageNotFound;
