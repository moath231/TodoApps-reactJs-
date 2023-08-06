import { useEffect, useRef, useState } from 'react';
import NoTodos from './NoTodos';
import FormTodo from './FormTodo';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import '../reset.css';
import '../App.css';

function App() {
  const [todos, setToDo]          = useLocalStorage('todos', []);
  const [name, setName]           = useLocalStorage('name', '');
  const nameInputEl               = useRef(null);
  const [idfortodo, setidfortodo] = useLocalStorage('idForTodos', 1);

  function addTodos(todo) {
    setToDo([
      ...todos,
      {
        id         : idfortodo,
        title      : todo,
        isComplete : false,
      },
    ]);

    setidfortodo((prevIdForTodo) => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setToDo([...todos].filter((todo) => todo.id !== id));
  }

  function completeTodo(id) {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }

  function markAsEditing(id) {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isediting = !todo.isediting;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }

  function updateTodo(event, id) {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isediting = false;
          return todo;
        }
        todo.title     = event.target.value;
        todo.isediting = false;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }

  function canceleditTodo(event, id) {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isediting = false;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }

  function remaining() {
    return todos.filter((todo) => todo.isComplete).length;
  }

  function ClearCompleted() {
    setToDo([...todos].filter((todo) => !todo.isComplete));
  }

  function checkAll() {
    const updateTodo = todos.map((todo) => {
      todo.isComplete = true;

      return todo;
    });

    setToDo(updateTodo);
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter((todo) => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.isComplete);
    }
  }

  useEffect(() => {
    nameInputEl.current.focus();
        // setName(JSON.parse(localStorage.getItem('name')) ?? '');
  });

  function handelNameInput(event) {
    setName(event.currentTarget.value);
        // localStorage.setItem('name',JSON.stringify(event.currentTarget.value));
  }

  return (
    <div className = "todo-app-container">
      <div className = "todo-app">
        <div className = "name-container">
          <h2>what is your name?</h2>
          <form action = "#">
            <input
              type        = "text"
              ref         = {nameInputEl}
              className   = "todo-input"
              placeholder = "What is your name"
              name        = {name}
              onChange    = {handelNameInput}
            />
          </form>
          {name && <p className="name-label"> hello, {name}</p>}
        </div>
        <h2>Todo App</h2>
        <FormTodo addTodos = {addTodos} />
        {todos.length > 0 ? (
          <TodoList
            todos          = {todos}
            completeTodo   = {completeTodo}
            markAsEditing  = {markAsEditing}
            updateTodo     = {updateTodo}
            canceleditTodo = {canceleditTodo}
            deleteTodo     = {deleteTodo}
            remaining      = {remaining}
            ClearCompleted = {ClearCompleted}
            checkAll       = {checkAll}
            todosFiltered  = {todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
