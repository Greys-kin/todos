import React from 'react';
import PropTypes from 'prop-types';

import './task-list.css';
import Task from '../task/task';

const TaskList = ({ todos, onDeleted, toggleDone, showEditForm, editItem, startTimer, stopTimer }) => {
  return (
    <ul className="todo-list">
      {todos.map((item) => {
        const { id, timeLeft, isPlay, ...itemProps } = item;
        return (
          <Task
            {...itemProps}
            toggleDone={() => toggleDone(id)}
            onDeleted={() => onDeleted(id)}
            showEditForm={() => showEditForm(id)}
            editItem={editItem}
            startTimer={() => startTimer(id)}
            stopTimer={() => stopTimer(id)}
            key={id}
            id={id}
            timeLeft={timeLeft}
            isPlay={isPlay}
          />
        );
      })}
    </ul>
  );
};

TaskList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  toggleDone: PropTypes.func,
  editItem: PropTypes.func,
  showEditForm: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
};

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  toggleDone: () => {},
  editItem: () => {},
  showEditForm: () => {},
  startTimer: () => {},
  stopTimer: () => {},
};

export default TaskList;
