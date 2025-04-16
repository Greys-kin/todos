import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import EditForm from './edit-form';
import TaskTimer from './task-timer';
import './task.css';

const Task = ({
  label,
  onDeleted,
  toggleDone,
  created,
  showEditForm,
  editItem,
  id,
  timeLeft,
  done,
  todos,
  startTimer,
  stopTimer,
  isPlay,
  isEditing,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    currentTime;
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createdTime = formatDistanceToNow(created, {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <li className={isEditing ? 'editing' : done ? 'completed' : 'active'}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={toggleDone} />
        <label>
          <span className="title">{label}</span>
          <TaskTimer
            timeLeftProp={timeLeft}
            toggleDone={toggleDone}
            done={done}
            todos={todos}
            startTimer={() => startTimer(id)}
            stopTimer={() => stopTimer(id)}
            isPlay={isPlay}
          />
          <span className="created">{createdTime}</span>
        </label>
        <button className="icon icon-edit" onClick={showEditForm}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {isEditing && <EditForm editItem={editItem} id={id} label={label} />}
    </li>
  );
};

Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  toggleDone: () => {},
  editItem: () => {},
  created: new Date(),
  isEditing: false,
};

Task.propTypes = {
  created: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  toggleDone: PropTypes.func,
  editItem: PropTypes.func,
  label: PropTypes.string,
  isEditing: PropTypes.bool,
};

export default Task;
