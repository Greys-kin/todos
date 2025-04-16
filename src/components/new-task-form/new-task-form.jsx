import React, { useState } from 'react';
import './new-task-form.css';

const NewTaskForm = ({ addTask }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let minValue = parseInt(min, 10) || 0;
    let secValue = parseInt(sec, 10) || 0;

    if (secValue >= 60 || minValue >= 60) {
      return;
    }

    if (label !== '') {
      addTask(label, minValue, secValue);
      setLabel('');
      setMin('');
      setSec('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="number"
        name="minutes"
        onChange={onMinChange}
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        min={0}
        max={59}
      />
      <input
        type="number"
        name="seconds"
        onChange={onSecChange}
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        min="0"
        max="59"
      />
      <button type="submit"></button>
    </form>
  );
};

export default NewTaskForm;
