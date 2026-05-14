import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    const response = await fetch("https://reformadotms.pythonanywhere.com/api/tasks/");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {

    if (title.trim() === "") {
      return;
    }

    await fetch("https://reformadotms.pythonanywhere.com/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        is_completed: false
      }),
    });

    setTitle("");
    fetchTasks();
  };

  return (
    <div className="app">

      <div className="task-container">

        <h1>Task Management System</h1>
        <p className="subtitle">
          Organize your daily tasks efficiently
        </p>

        <div className="task-input">

          <input
            type="text"
            placeholder="Enter a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>
            Add Task
          </button>

        </div>

        <div className="task-list">

          {tasks.length === 0 ? (
            <p className="empty">
              No tasks yet.
            </p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <span>{task.title}</span>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default App;