import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, toggleDone, showEditForm, editItem } = this.props;
    const elements = todos.map((item) => {
      const { id, timeLeft, isPlay, ...itemProps } = item;
      return (
        <Task
          {...itemProps}
          toggleDone={() => toggleDone(id)}
          onDeleted={() => onDeleted(id)}
          showEditForm={() => showEditForm(id)}
          editItem={editItem}
          startTimer={this.props.startTimer}
          stopTimer={this.props.stopTimer}
          key={id}
          id={id}
          timeLeft={timeLeft}
          isPlay={isPlay}
        />
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}

TaskList.propDefault = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleCheckbox: PropTypes.func,
  editItem: PropTypes.func,
  showEditForm: PropTypes.func,
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleCheckbox: () => {},
  editItem: () => {},
  showEditForm: () => {},
};
