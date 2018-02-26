// @flow weak
import React from 'react';
import classNames from 'classnames';

const Humburger = () => {
  return (
    <button
      className={classNames('navbar-toggle', 'collapsed')}
      type="button"
      data-toggle="collapse"
      data-target="#bs-example-navbar-collapse-1">
      <span className={classNames('sr-only')}>
        Toggle navigation
      </span>
      <span className={classNames('icon-bar')} />
      <span className={classNames('icon-bar')} />
      <span className={classNames('icon-bar')} />
    </button>
  );
};

export default Humburger;
