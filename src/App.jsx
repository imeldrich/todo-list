import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const tasksFromDB = localStorage.getItem("tasks");
    return tasksFromDB ? JSON.parse(tasksFromDB) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask) {
      setTasks((tasks) => {
        return [...tasks, { id: nanoid(), text: newTask, completed: false }];
      });
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleCheck = (id) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      } else {
        return task;
      }
    });

    updatedTask.sort((a, b) => a.completed - b.completed);
    setTasks(updatedTask);
  };

  return (
    <div className="bg-[#cccccc] min-h-screen p-5 flex items-center justify-center select-none">
      <div className="bg-[#f2f2f2] w-3xl h-fit rounded-xl p-6 flex flex-col items-center gap-5 shadow-lg font-mono tracking-wider">
        <h1 className="text-[#0b2545] text-3xl font-bold">To-Do-List</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            className="block w-sm h-8 bg-white p-2.5 rounded-md shadow-sm "
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            className="bg-[#2196f3] hover:bg-[#42a5f5] transition-colors px-4 py-1 rounded-md shadow-sm text-white"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <div>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className="bg-white w-lg px-3 py-2 rounded-md shadow-xs mb-2 flex justify-between items-center"
                >
                  <input
                    type="checkbox"
                    id="task"
                    onChange={() => handleCheck(task.id)}
                    checked={task.completed}
                  />
                  <label
                    className={
                      task.completed ? "line-through text-zinc-400" : ""
                    }
                  >
                    {task.text}
                  </label>
                  <div className="flex items-center gap-2.5">
                    <img src={editImg} alt="edit image" className="h-6" />
                    <img
                      src={deleteImg}
                      alt="delete image"
                      className="h-6"
                      onClick={() => deleteTask(task.id)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-zinc-500 text-base">
              You don't have a task yet...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
