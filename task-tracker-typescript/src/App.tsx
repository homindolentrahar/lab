import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import { TasksInterface } from "./types/interfaces";
import AddTask from "./components/AddTask";

const App = () => {
  const localTasks: Array<TasksInterface> = [];
  const [task, setTask] = useState(localTasks);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTask(tasks);
    };

    getTasks();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    console.log(data);
    return data;
  };

  // Fetch task
  const fetchTask = async (id: number) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    console.log(data);
    return data;
  };

  // Add Task
  const addTask = async (newTask: TasksInterface) => {
    console.log(`Add ${newTask}`);
    // setTask([...task, newTask]);
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newTask),
    });
    const data = await res.json();

    setTask([...task, data]);
  };

  // Delete Task
  const deleteTask = async (id: number) => {
    console.log(`Delete ${id}`);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTask(task.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id: number) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
    };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    console.log(`Toggled ${id}`);
    setTask(
      task.map((value) =>
        value.id === id ? { ...value, reminder: data.reminder } : value
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          text={showAddTask ? "Close" : "Add"}
          onAdd={() => setShowAddTask(!showAddTask)}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {task.length > 0 ? (
                <Tasks
                  tasks={task}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Tasks"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
