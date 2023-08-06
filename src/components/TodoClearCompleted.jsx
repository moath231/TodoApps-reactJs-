import React from 'react';
import PropTypes, { func } from 'prop-types';

TodoClearCompleted.prototype = {
  ClearCompleted : PropTypes.func.isRequired,
};

function TodoClearCompleted(props) {
  return (
    <button onClick = {props.ClearCompleted} className = "button">
      Clear completed
    </button>
  );
}

export default TodoClearCompleted;
