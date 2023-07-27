import { useEffect, useRef, useState } from 'react';
import NoTodos from './NoTodos';
import FormTodo from './FormTodo';
import TodoList from './TodoList';
import '../reset.css';
import '../App.css';

function App() {
  const [todos, setToDo] = useState([
    {
      id         : 1,
      title      : 'Finish React Series',
      isComplete : false,
      isediting  : false,
    },
    {
      id         : 2,
      title      : 'Go to Grocery',
      isComplete : true,
      isediting  : false,
    },
    {
      id         : 3,
      title      : 'Do other thing',
      isComplete : false,
      isediting  : false,
    },
  ]);

  const [name, setName]           = useState('');
  const nameInputEl               = useRef(null);
  const [idfortodo, setidfortodo] = useState(4);

  useEffect(() => {
    console.log('askjhsfhkjs');
  });

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

  return (
    <div className = "todo-app-container">
      <div className = "todo-app">
        <div className = "name-container">
          <h2>what is your name?</h2>
          <button onClick = {() => nameInputEl.current.focus()}>Get Ref</button>
          <form   action  = "#">
            <input
              type        = "text"
              ref         = {nameInputEl}
              className   = "todo-input"
              placeholder = "What is your name"
              name        = {name}
              onChange    = {(event) => setName(event.currentTarget.value)}
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

