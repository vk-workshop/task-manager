import { useState } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cleanTitle = formData.title.trim();
    if (!cleanTitle) {
      alert('Title cannot be empty');
      return;
    }
  
    onSubmit({
      title: cleanTitle,
      description: formData.description.trim(),
      status: formData.status ? 1 : 0,
    });
  };

  return (
    <div className="task-form">
      <h2>{task?.id ? 'Edit Task' : 'New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </label>
        
        <label>
          Description:
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
        
        <label className="status-checkbox">
          Completed:
          <input
            type="checkbox"
            checked={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.checked })}
          />
        </label>
        
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;