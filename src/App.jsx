import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';
import './pages/styles.css'; 

function App() {
    const [todos, setTodos] = useState([
        { id: 1, title: 'Buy groceries', completed: false },
        { id: 2, title: 'Read a book', completed: false },
    ]);

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">To-Do list</Link>
                </nav>
                <Routes>
                    <Route 
                        path="/" 
                        element={<TodoPage todos={todos} setTodos={setTodos} />} 
                    />
                    <Route 
                        path="/dnd" 
                        element={<DndPage todos={todos} setTodos={setTodos} />} 
                    />
                </Routes>
            </div>
        </Router> 
    );
}

export default App;