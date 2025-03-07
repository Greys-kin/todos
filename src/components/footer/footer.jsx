import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './footer.css';
import TaskFilter from './task-filter/task-filter';

export default class Footer extends Component {
  render() {
    const { active, filter, onFilterChange, clearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{active} items left</span>
        <TaskFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  active: null,
  filter: '',
  onFilterChange: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  active: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func,
};
