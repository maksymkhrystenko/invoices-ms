// @flow weak
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Toolbox = (props) => {
  return (
    <nav className={classNames('panel', 'panel-default')}>
      <div className={classNames('panel-body')}>
        <div className={classNames('pull-right')}>
          {props.children}
        </div>
      </div>
    </nav>
  );
};

Toolbox.propTypes = {
  children: PropTypes.node
};

export default Toolbox;
