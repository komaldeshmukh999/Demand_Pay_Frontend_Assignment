import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import TaskFilter from './components/TaskFilter';

const API_URL = 'http://localhost:5000/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async (filterParam = filter) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}?status=${filterParam}`);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      setTitle('');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, completed) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTitle = async (id, newTitle) => {
    if (!newTitle.trim()) {
      setError('Task title cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchTasks(newFilter);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Add new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
          disabled={loading}
        />
        <button onClick={addTask} disabled={loading}>Add</button>
      </div>

      <TaskFilter filter={filter} onFilterChange={onFilterChange} />

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading"></div>}

      {!loading && tasks.length === 0 && <p>No tasks found</p>}

      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onUpdateTitle={updateTitle}
          />
        ))}
      </ul>
    </div>
  );
}


