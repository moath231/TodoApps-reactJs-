import React, { useState } from 'react';
import PropTypes from 'prop-types';

FormTodo.prototype = {
  addTodos : PropTypes.func.isRequired,
};

export default function FormTodo(props) {
  const [todoInput, setToDoInput] = useState();

  function handelInput(event) {
    setToDoInput(event.target.value);
  }

  function handeladdTodo(event) {
    event.preventDefault();

    if (todoInput.trim().length === 0) {
      return;
    }

    props.addTodos(todoInput);

    setToDoInput();
  }

  return (
    <form action = "#" onSubmit = {handeladdTodo}>
      <input
        type        = "text"
        value       = {todoInput}
        onChange    = {handelInput}
        className   = "todo-input"
        placeholder = "What do you need to do?"
      />
    </form>
  );
}
