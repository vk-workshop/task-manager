const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div className={`task-item ${task.status ? 'completed' : ''}`}>
      <div className="task-content">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div className="task-status">
          Status: {task.status ? 'Completed' : 'Pending'}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;