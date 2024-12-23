import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './dndStyles.css';

function DndPage({ todos, setTodos }) {
  const [columns, setColumns] = useState({
    'incomplete-tasks': { items: todos.filter(todo => !todo.completed && !todo.inProgress && !todo.inReview) },
    'in-progress-tasks': { items: todos.filter(todo => todo.inProgress) },
    'review-tasks': { items: todos.filter(todo => todo.inReview) },
    'completed-tasks': { items: todos.filter(todo => todo.completed) },
  });

  const onDragEnd = (result) => { //завершает перетаскивание элементов//
    if (!result.destination) return; //предотвращает, если элемент за пределы//
    
    const sourceColumnId = result.source.droppableId; //свойство указывает на колонки, из которой был перетаскиваемый элемент.
    const destinationColumnId = result.destination.droppableId; //свойство указывает на идентификатор колонки, в которую элемент был перемещен.

    //извлечение колонок
    const sourceColumn = columns[sourceColumnId]; //извлекает объект колонки, из был перемещен элемент, используя sourceColumnId. 
    const destinationColumn = columns[destinationColumnId]; //извлекает объект колонки, в которую был перемещен элемент, используя destinationColumnId.
    
    //копирование элементоа
    const sourceItems = Array.from(sourceColumn.items); //копию массива элементов из исходной колонки. Мы используем Array.from() для создания нового массива, чтобы избежать мутаций состояния.
    const destItems = destinationColumnId === sourceColumnId 
      ? sourceItems //внутри 1 столбца
      : Array.from(destinationColumn.items); //в ином,создаем копию элементов из destinationColumn.

//удаление эл  из исходного столбца
    const [removed] = sourceItems.splice(result.source.index, 1);

    if (sourceColumnId === destinationColumnId) {
      sourceItems.splice(result.destination.index, 0, removed); //обработка перетаскивания в ту же колонку 
      setColumns({ // обновление сотояния 
        ...columns,
        [sourceColumnId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(result.destination.index, 0, removed);//обработка перетаскавания в другую колонку
      setColumns({ //обновления состояния для 2
        ...columns, //копируем сущ колонки
        [sourceColumnId]: {
          ...sourceColumn, //коп текущме свойства столбцв
          items: sourceItems, //обновляем массив items для этого столбца
        },
        [destinationColumnId]: {  
          ...destinationColumn, //обновляется кон столбец
          items: destItems,
        },
      });
    }
  };

  const handleDelete = (id) => { //объявляет функцию с именем handleDelete, которая принимает один параметр — id.
    const updatedTodos = todos.filter(todo => todo.id !== id); //метод filter для массива todos. Он создает новый массив с именем updatedTodos, который включает все todos, кроме того, у которого совпадает указанный id.
    setTodos(updatedTodos);//обновляет состояние todos, используя функцию setTodos.
    setColumns({ // обновляет состояние columns
      'incomplete-tasks': { items: updatedTodos.filter(todo => !todo.completed) },
      'in-progress-tasks': { items: updatedTodos.filter(todo => todo.inProgress) },
      'review-tasks': { items: updatedTodos.filter(todo => todo.inReview) },
      'completed-tasks': { items: updatedTodos.filter(todo => todo.completed) },
    });
  };

  return (
    <div className="dnd-container">
      <div className="task-board-title">Task Board</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {/* Колонка "Incomplete Tasks" */}
          <Droppable droppableId="incomplete-tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h3>Незавершенные задачи</h3>
                {columns['incomplete-tasks'].items.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item">
                        <span>{todo.title}</span>
                        <button onClick={() => handleDelete(todo.id)} className="delete-button">Удалить</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Колонка "In-Progress Tasks" */}
          <Droppable droppableId="in-progress-tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h3>Задачи в процессе</h3>
                {columns['in-progress-tasks'].items.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item">
                        <span>{todo.title}</span>
                        <button onClick={() => handleDelete(todo.id)} className="delete-button">Удалить</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Колонка "Review Tasks" */}
          <Droppable droppableId="review-tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h3>Задачи на проверке</h3>
                {columns['review-tasks'].items.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item">
                        <span>{todo.title}</span>
                        <button onClick={() => handleDelete(todo.id)} className="delete-button">Удалить</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Колонка "Completed Tasks" */}
          <Droppable droppableId="completed-tasks">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="column">
                <h3>Завершенные задачи</h3>
                {columns['completed-tasks'].items.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item">
                        <span>{todo.title}</span>
                        <button onClick={() => handleDelete(todo.id)} className="delete-button">Удалить</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default DndPage;