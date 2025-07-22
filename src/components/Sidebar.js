import React from 'react';

const SquareIcon = () => (
  <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <rect width="50" height="50" fill="#e74c3c" />
  </svg>
);

const CircleIcon = () => (
  <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="25" fill="#3498db" />
  </svg>
);

const TriangleIcon = () => (
  <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <polygon points="25,0 0,50 50,50" fill="#2ecc71" />
  </svg>
);

const shapes = [
  { type: 'Square', icon: <SquareIcon /> },
  { type: 'Circle', icon: <CircleIcon /> },
  { type: 'Triangle', icon: <TriangleIcon /> },
];

const Sidebar = ({ onSelect }) => (
  <aside className="sidebar">
    <div className="sidebar-label">Tools</div>

    {shapes.map((shape) => (
      <div
        key={shape.type}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("shape", shape.type);
          onSelect(shape.type);
        }}
      >
        {shape.icon}
      </div>
    ))}
  </aside>
);

export default Sidebar;
