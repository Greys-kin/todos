import { Component } from 'react';
import React from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let { min, sec } = this.state;
    const { label } = this.state;
    min = parseInt(min, 10) || 0;
    sec = parseInt(sec, 10) || 0;

    if (!sec) {
      sec = 0;
    }
    if (!min) {
      min = 0;
    }
    if (sec >= 60) {
      return;
    }

    if (label !== '') {
      this.props.addTask(this.state.label, min, sec);
      this.setState({
        label: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    const { sec, min } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input
          type="number"
          name="minutes"
          onChange={this.onMinChange}
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          min="0"
        />
        <input
          type="number"
          name="seconds"
          onChange={this.onSecChange}
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          min="0"
          max="59"
        />
        <button type="submit"></button>
      </form>
    );
  }
}
