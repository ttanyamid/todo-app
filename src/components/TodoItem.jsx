import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)} // Обработчик для переключения
                className="custom-checkbox"
            />
            <span style={{ color: 'black', fontSize: '1.2em' }} className={todo.completed ? 'completed' : ''}>
                {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
        </div>
    );
}

export default TodoItem;