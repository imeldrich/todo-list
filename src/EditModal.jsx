import { useState } from "react";
import { createPortal } from "react-dom";

const EditModal = ({ onClose, task, taskId, handleEdit }) => {
  const [editedTask, setEditedTask] = useState(task);

  return createPortal(
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center font-mono tracking-wider">
      <div className="bg-[#f2f2f2] w-full max-w-xl md:max-w-2xl h-fit rounded-xl p-4 md:p-6 flex flex-col items-center gap-5 shadow-lg select-none">
        <h1 className="text-[#0b2545] text-3xl font-bold">Edit Task</h1>
        <input
          type="text"
          className="block w-full h-9 md:h-10 bg-white px-3 rounded-md shadow-sm text-sm md:text-base"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEdit(editedTask, taskId);
            }
          }}
          maxLength={50}
          autoFocus
        />
        <button
          onClick={() => handleEdit(editedTask, taskId)}
          className="bg-green-600 hover:bg-green-500 transition-colors px-4 h-9 md:h-10 rounded-md shadow-sm text-white"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-500 transition-colors px-4 h-9 md:h-10 rounded-md shadow-sm text-white"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("portal"),
  );
};

export default EditModal;
