import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (title.trim() === '') return;
    await axios.post(API_URL, { title });
    setTitle('');
    fetchTasks();
  };

  const updateTask = async (id, updatedTask) => {
    await axios.put(`${API_URL}/${id}`, updatedTask);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div className="App">
      <h2>📝 To-Do List</h2>
      <div className="input-container">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                updateTask(task.id, {
                  ...task,
                  completed: !task.completed
                })
              }
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : '' }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
