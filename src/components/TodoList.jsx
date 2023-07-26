import React, { useState } from 'react';
import PropTypes, { func } from 'prop-types';
import ItemRemaining from './ItemRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import Todocheckall from './Todocheckall';
import FilterTodo from './FilterTodo';

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  todosFiltered: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  canceleditTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  ClearCompleted: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired
}

export default function TodoList(props) {

const [filter,setfilter] = useState('all');


return (
<div>
  <ul className="todo-list">
    { props.todosFiltered(filter).map((todo,index) => (
    <li key={todo.id} className="todo-item-container ">
      <div className="todo-item ">
        <input type="checkbox" onChange={ ()=> props.completeTodo(todo.id) } checked={todo.isComplete ? 'checked' : ''}/>
        {!todo.isediting ? (
        <span className={`todo-item-label ${todo.isComplete ? 'line-through' : '' }` } onDoubleClick={()=>
          props.markAsEditing(todo.id)}
          >
          { todo.title }
        </span>
        ):(
        <input type="text" onBlur={event=> props.updateTodo(event,todo.id)}
        onKeyDown={event => {
        if(event.key === "Enter"){
        props.updateTodo(event,todo.id);
        } else if(event.key === 'Escape'){
        props.canceleditTodo(event,todo.id);
        }
        }}
        className="todo-item-input"
        defaultValue={todo.title}
        autoFocus
        />
        )
        }
      </div>
      <button onClick={()=> props.deleteTodo(todo.id)} className="x-button">
        <svg className="x-button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
    ))}
  </ul>

  <div className="check-all-container">
    <div>
      <Todocheckall checkAll={props.checkAll} />
    </div>

    <ItemRemaining remaining={props.remaining} />
  </div>

  <div className="other-buttons-container">
    <FilterTodo 
      todosFiltered={props.todosFiltered}
      filter={filter}
      setFilter={setfilter}
    />

    <div>
      <TodoClearCompleted ClearCompleted={props.ClearCompleted} />
    </div>
  </div>
</div>
);
}
