import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './edit-form.css';

const EditForm = ({ editItem, id, label }) => {
  const [newLabel, setNewLabel] = useState(label);

  const onLabelEdit = (e) => {
    setNewLabel(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editItem(newLabel, id);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={newLabel} onChange={onLabelEdit} autoFocus />
    </form>
  );
};

EditForm.propTypes = {
  editItem: PropTypes.func,
  id: PropTypes.number,
  label: PropTypes.string,
};

EditForm.defaultProps = {
  editItem: () => {},
  label: '',
};

export default EditForm;
