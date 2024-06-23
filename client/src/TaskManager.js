import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to fetch tasks');
      }
    };
  
    const addTask = async () => {
      try {
        const newTask = { title, description, dueDate };
        await axios.post('http://localhost:5000/tasks', newTask);
        fetchTasks();
        setTitle('');
        setDescription('');
        setDueDate('');
      } catch (error) {
        console.error('Error adding task:', error);
        setError('Failed to add task');
      }
    };
  
    const updateTask = async (id) => {
      try {
        const updatedTask = { title, description, dueDate };
        await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
        fetchTasks();
        setTitle('');
        setDescription('');
        setDueDate('');
        setEditingTaskId(null);
      } catch (error) {
        console.error('Error updating task:', error);
        setError('Failed to update task');
      }
    };
  
    const deleteTask = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        fetchTasks(); // Refresh tasks after successful deletion
      } catch (error) {
        console.error('Error deleting task:', error);
        setError('Failed to delete task. Please try again later.'); // Update error state
      }
    };
  
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  
    return (
        <div className="container">
        <h1>Task Manager</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={dueDate}
            min={today} // Limit date selection to today and onwards
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button onClick={editingTaskId ? () => updateTask(editingTaskId) : addTask}>
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="list-group-item">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{new Date(task.dueDate).toLocaleDateString()}</p>
              <button onClick={() => { 
                setEditingTaskId(task._id);
                setTitle(task.title);
                setDescription(task.description);
                setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
              }}>
                Edit
              </button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TaskManager;