import React, { Component } from 'react';
import './edit-form.css';
import PropTypes from 'prop-types';

export default class EditForm extends Component {
  state = {
    newLabel: this.props.label,
  };

  onLabelEdit = (e) => {
    this.setState({
      newLabel: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { editItem, id } = this.props;
    editItem(this.state.newLabel, id);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="edit" value={this.state.newLabel} onChange={this.onLabelEdit} autoFocus />
      </form>
    );
  }
}

EditForm.propDefault = {
  editItem: PropTypes.func,
  id: PropTypes.number,
  label: PropTypes.string,
};

EditForm.defaultProps = {
  editItem: () => {},
  label: '',
};
