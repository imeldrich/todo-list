import { useState } from "react";
import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask) {
      setTasks((tasks) => {
        return [...tasks, newTask];
      });
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-[#cccccc] min-h-screen p-5 flex items-center justify-center select-none">
      <div className="bg-[#f2f2f2] w-3xl h-fit rounded-xl p-5 flex flex-col items-center gap-5 shadow-lg font-sans tracking-wider">
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
            tasks.map((task, index) => {
              return (
                <div className="bg-white w-lg px-3 py-2 rounded-md shadow-xs mb-2 flex justify-between items-center">
                  <p>{task}</p>
                  <div className="flex items-center gap-2.5">
                    <img src={editImg} alt="edit image" className="h-6" />
                    <img
                      src={deleteImg}
                      alt="delete image"
                      className="h-6"
                      onClick={() => deleteTask(index)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 text-base">
              You don't have a task yet...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
