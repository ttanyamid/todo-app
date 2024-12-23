// src/components/TodoList.jsx
import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id} className="todo-item">
          <div
            className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed && '✔'} {/* Отображаем галочку, если выполнено */}
          </div>
          <span className="todo-text" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
