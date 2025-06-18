// import React, { useState } from 'react';

// export default function TaskItem({ task, onDelete, onToggleComplete, onUpdateTitle }) {
//   const [editMode, setEditMode] = useState(false);
//   const [tempTitle, setTempTitle] = useState(task.title);

//   const handleSave = () => {
//     if (tempTitle.trim() && tempTitle !== task.title) {
//       onUpdateTitle(task.id, tempTitle);
//     }
//     setEditMode(false);
//   };

//   return (
//     <li className={`task-item ${task.completed ? 'completed' : ''}`}>
//       <input
//         type="checkbox"
//         checked={task.completed}
//         onChange={() => onToggleComplete(task.id, task.completed)}
//       />
//       {editMode ? (
//         <input
//           type="text"
//           value={tempTitle}
//           onChange={(e) => setTempTitle(e.target.value)}
//           onBlur={handleSave}
//           onKeyDown={e => {
//             if (e.key === 'Enter') handleSave();
//             else if (e.key === 'Escape') {
//               setTempTitle(task.title);
//               setEditMode(false);
//             }
//           }}
//           autoFocus
//         />
//       ) : (
//         <span onDoubleClick={() => setEditMode(true)}>{task.title}</span>
//       )}

//       <button onClick={() => onDelete(task.id)} aria-label="Delete task">
//         &times;
//       </button>
//     </li>
//   );
// }

import React, { useState } from 'react';

export default function TaskItem({ task, onDelete, onToggleComplete, onUpdateTitle }) {
  const [editMode, setEditMode] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);

  const handleSave = () => {
    if (tempTitle.trim() && tempTitle !== task.title) {
      onUpdateTitle(task.id, tempTitle);
    }
    setEditMode(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id, task.completed)}
      />

      {editMode ? (
        <input
          type="text"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSave();
            else if (e.key === 'Escape') {
              setTempTitle(task.title);
              setEditMode(false);
            }
          }}
          autoFocus
        />
      ) : (
        // Remove onDoubleClick here and just show title normally
        <span>{task.title}</span>
      )}

      {/* Add Edit button */}
      {!editMode && (
        <button onClick={() => setEditMode(true)}>
          Edit
        </button>
      )}

      <button onClick={() => onDelete(task.id)} aria-label="Delete task">
        Delete
      </button>
    </li>
  );
}
