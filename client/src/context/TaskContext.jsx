import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};

      if (search.trim()) params.search = search.trim();
      if (priority) params.priority = priority;
      if (status) params.status = status;

      const { data } = await api.get("/tasks", { params });

      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError("");

      const { data } = await api.post("/tasks", taskData);

      setTasks((prev) => [data, ...prev]);

      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setError("");

      const { data } = await api.put(`/tasks/${id}`, taskData);

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data : task))
      );

      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
      return false;
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {
      setError("");

      await api.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      setError("");

      const { data } = await api.patch(`/tasks/${id}/status`);

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? data : task))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setPriority("");
    setStatus("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTasks();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, priority, status]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        search,
        setSearch,
        priority,
        setPriority,
        status,
        setStatus,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        clearFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);