import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

const TaskFilter = ({ filter, onFilterChange }) => {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => {
        const isActive = filter === name;
        const clazz = isActive ? 'selected' : '';
        return (
          <li key={name}>
            <button className={clazz} onClick={() => onFilterChange(name)}>
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TaskFilter.defaultProps = {
  filter: '',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
