import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import EditForm from './edit-form';

import './task.css';

export default class Task extends Component {
  state = {
    currentTime: new Date(),
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { label, onDeleted, toggleDone, created, showEditForm, editItem, id } = this.props;

    const createdTime = formatDistanceToNow(created, {
      addSuffix: true,
      includeSeconds: true,
    });

    return (
      <>
        <li className={this.props.isEditing ? 'editing' : this.props.done ? 'completed' : 'active'}>
          <div className="view">
            <input className="toggle" type="checkbox" onClick={toggleDone} />
            <label>
              <span className="description">{label}</span>
              <span className="created">{createdTime}</span>
            </label>
            <button className="icon icon-edit" onClick={showEditForm}></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
          {this.props.isEditing && <EditForm editItem={editItem} id={id} label={label} />}
        </li>
      </>
    );
  }
}

Task.defaultProps = {
  label: '',
  onDeleted: () => {},
  toggleDone: () => {},
  editItem: () => {},
  created: {},
};

Task.propTypes = {
  dateCreated: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  toggleDone: PropTypes.func,
  editItem: PropTypes.func,
  label: PropTypes.string,
};
