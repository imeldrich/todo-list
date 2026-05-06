import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import deleteImg from "./assets/delete.png";
import editImg from "./assets/edit.png";
import EditModal from "./EditModal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const tasksFromDB = localStorage.getItem("tasks");
    return tasksFromDB ? JSON.parse(tasksFromDB) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks((tasks) => [
        { id: nanoid(), text: newTask, completed: false },
        ...tasks,
      ]);
      setNewTask("");
    }
  };

  const handleEdit = (editedTask, id) => {
    if (editedTask.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, text: editedTask } : task,
      );
      setSelectedTask("");
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCheck = (id) => {
    const updatedTask = tasks
      .map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      )
      .sort((a, b) => a.completed - b.completed);

    setTasks(updatedTask);
  };

  return (
    <div className="bg-[#cccccc] min-h-screen w-full p-4 md:p-5 flex items-center justify-center select-none">
      <div className="bg-[#f2f2f2] w-full max-w-lg md:max-w-2xl lg:max-w-4xl h-fit rounded-xl p-4 md:p-6 flex flex-col items-center gap-5 shadow-lg font-mono tracking-wider">
        <h1 className="text-[#0b2545] text-3xl font-bold">To-Do-List</h1>

        <div className="flex w-full max-w-2xl gap-2 md:gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            className="block w-full flex-1 min-w-0 h-9 md:h-10 bg-white px-3 rounded-md shadow-sm text-sm md:text-base"
            value={newTask}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            maxLength={50}
          />
          <button
            className="bg-[#2196f3] hover:bg-[#42a5f5] transition-colors px-3 md:px-4 h-9 md:h-10 rounded-md shadow-sm text-white text-sm md:text-base whitespace-nowrap"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <div className="w-full flex flex-col items-center">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white w-full max-w-2xl px-3 py-2 rounded-md shadow-xs mb-2 flex justify-between items-center"
              >
                <input
                  type="checkbox"
                  onChange={() => handleCheck(task.id)}
                  checked={task.completed}
                />
                <label
                  className={`flex-1 mx-3 wrap-break-word ${
                    task.completed ? "line-through text-zinc-400" : ""
                  }`}
                >
                  {task.text}
                </label>
                <div className="flex items-center gap-2.5">
                  <img
                    src={editImg}
                    alt="edit"
                    className="h-6 cursor-pointer"
                    onClick={() => setSelectedTask(task.id)}
                  />
                  <img
                    src={deleteImg}
                    alt="delete"
                    className="h-6 cursor-pointer"
                    onClick={() => deleteTask(task.id)}
                  />
                </div>

                {selectedTask === task.id && (
                  <EditModal
                    onClose={() => setSelectedTask("")}
                    task={task.text}
                    taskId={task.id}
                    handleEdit={handleEdit}
                  />
                )}
              </div>
            ))
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
