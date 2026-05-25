import { useTasks } from "../context/TaskContext";

const Filters = () => {
  const {
    search,
    setSearch,
    priority,
    setPriority,
    status,
    setStatus,
    clearFilters,
  } = useTasks();

  return (
    <section className="filters">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button className="clear-btn" onClick={clearFilters}>
        Clear
      </button>
    </section>
  );
};

export default Filters;