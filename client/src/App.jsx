import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterSearch from './components/FilterSearch';
import './App.css';

const API_URL = 'http://localhost:3001/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {};
        if (filter !== 'all') params.status = filter;
        const response = await axios.get(API_URL, { params });
        setTasks(response.data);
        setError('');
      } catch (err) {
        setError(`Failed to fetch tasks ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filter]);

    const handleCreate = async (taskData) => {
      try {
        const response = await axios.post(API_URL, taskData);
        setTasks([...tasks, response.data]);
        setEditingTask(null);
      } catch (err) {
        setError(`Failed to create task: ${err.message}`);
      }
    };

  const handleUpdate = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setEditingTask(null);
    } catch (err) {
      setError(`Failed to update task ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(`Failed to delete task ${err.message}`);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>Task Manager</h1>
      {error && <div className="error">{error}</div>}
      
      <FilterSearch
        filter={filter}
        searchQuery={searchQuery}
        onFilterChange={setFilter}
        onSearchChange={setSearchQuery}
      />
      
      <button className="add-button" onClick={() => setEditingTask({})}>
        Add New Task
      </button>
      
      {editingTask && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask.id ? handleUpdate : handleCreate}
          onCancel={() => setEditingTask(null)}
        />
      )}
      
      <TaskList
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;