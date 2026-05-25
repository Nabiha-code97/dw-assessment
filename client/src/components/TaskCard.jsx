import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask, toggleTaskStatus } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title || "",
    description: task.description || "",
    priority: task.priority || "medium",
    dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
  });

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!editData.title.trim()) return;

    const payload = {
      title: editData.title.trim(),
      description: editData.description.trim(),
      priority: editData.priority,
    };

    if (editData.dueDate) {
      payload.dueDate = editData.dueDate;
    }

    const success = await updateTask(task._id, payload);

    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <article className={`task-card ${task.status === "completed" ? "done" : ""}`}>
      {isEditing ? (
        <>
          <input
            name="title"
            value={editData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={editData.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            name="dueDate"
            type="date"
            value={editData.dueDate}
            onChange={handleChange}
          />

          <div className="card-actions">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="card-top">
            <h3>{task.title}</h3>
            <span className={`badge ${task.priority}`}>{task.priority}</span>
          </div>

          {task.description && <p>{task.description}</p>}

          {task.dueDate && (
            <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
          )}

          <div className="card-status">
            <label>
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => toggleTaskStatus(task._id)}
              />
              {task.status}
            </label>
          </div>

          <div className="card-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        </>
      )}
    </article>
  );
};

export default TaskCard;