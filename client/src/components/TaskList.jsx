import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const { tasks, loading, error } = useTasks();

  if (loading) {
    return <p className="message">Loading tasks...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  if (!tasks.length) {
    return <p className="message">No tasks found.</p>;
  }

  return (
    <section className="task-grid">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </section>
  );
};

export default TaskList;