import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <main>
      <Header />

      <div className="container">
        <TaskForm />
        <Filters />
        <TaskList />
      </div>
    </main>
  );
};

export default App;