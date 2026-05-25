import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const initialState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

const TaskForm = () => {
  const { createTask } = useTasks();
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormError("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setFormError("Title is required");
      return;
    }

    setSubmitting(true);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
    };

    if (formData.dueDate) {
      payload.dueDate = formData.dueDate;
    }

    const success = await createTask(payload);

    if (success) {
      setFormData(initialState);
    }

    setSubmitting(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Take a task..."
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <div className="form-row">
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Adding..." : "Add"}
        </button>
      </div>

      {formError && <p className="form-error">{formError}</p>}
    </form>
  );
};

export default TaskForm;