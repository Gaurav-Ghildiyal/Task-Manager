import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function TaskDetails() {
  const [task, setTask] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => window.location.href = '/')
      .catch(error => console.log(error));
  };

  return (
    <div className="container">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <Link to={`/edit/${task._id}`} className="btn btn-warning">Edit</Link>
      <button onClick={handleDelete} className="btn btn-danger ml-2">Delete</button>
    </div>
  );
}

export default TaskDetails;
