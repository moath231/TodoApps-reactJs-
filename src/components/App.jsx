import { useState } from 'react';
import '../reset.css';
import '../App.css';

function App() {

  const [todos,setToDo] = useState([
    {
      id:1,
      title:'Finish React Series',
      isComplete: false,
      isediting: false,
    },
    {
      id: 2,
      title:'Go to Grocery',
      isComplete: true,
      isediting: false,
    },
    {
      id: 3,
      title:'Do other thing',
      isComplete: false,
      isediting: false,
    }
  ]);

  const [todoInput,setToDoInput] = useState();
  const [idfortodo,setidfortodo] = useState(4);

  function addTodos(event){
    event.preventDefault();

    if(todoInput.trim().length === 0){
      return;
    }

    setToDo([...todos, {
      id: idfortodo,
      title:todoInput,
      isComplete: true
    }])

    setToDoInput();
    setidfortodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id){
    setToDo([...todos].filter(todo => todo.id !== id));
  }

  function handelInput(event){
    setToDoInput(event.target.value)
  }

  function completeTodo(id){
    const updatedTodo = todos.map(todo => {
      if(todo.id === id){
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }

  function markAsEditing(id){
    const updatedTodo = todos.map(todo => {
      if(todo.id === id){
        todo.isediting = !todo.isediting;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }

  function updateTodo(event,id){
    const updatedTodo = todos.map(todo => {
      if(todo.id === id){
        if(event.target.value.trim().length === 0){
          todo.isediting =false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isediting = false;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }


  function canceleditTodo(event,id){
    const updatedTodo = todos.map(todo => {
      if(todo.id === id){
        todo.isediting = false;
      }

      return todo;
    });

    setToDo(updatedTodo);
  }


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={addTodos}>
          <input
            type="text"
            value={todoInput}
            onChange={handelInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>
        <ul className="todo-list">

          { todos.map((todo,index) => (
            <li key={todo.id} className="todo-item-container ">
            <div className="todo-item ">
              <input type="checkbox" onChange={ () => completeTodo(todo.id) } checked={todo.isComplete ? 'checked' : ''}/>
              {!todo.isediting ? (
                <span 
                    className={`todo-item-label ${todo.isComplete ? 'line-through' : '' }` }
                    onDoubleClick={() => markAsEditing(todo.id)}
                    >
                    { todo.title }
                    </span>
              ):(
                <input 
                  type="text" 
                  onBlur={event => updateTodo(event,todo.id)}
                  onKeyDown={event => {
                    if(event.key === "Enter"){
                      updateTodo(event,todo.id);
                    } else if(event.key === 'Escape'){
                      canceleditTodo(event,todo.id);
                    }
                  }}
                  className="todo-item-input" 
                  defaultValue={todo.title}
                  autoFocus
                  />
              )
            }
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
          ))}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;