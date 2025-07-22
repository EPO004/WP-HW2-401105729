import React from 'react';

const SquareIcon = () => (
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="30" fill="#e74c3c" />
  </svg>
);

const CircleIcon = () => (
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#3498db" />
  </svg>
);

const TriangleIcon = () => (
  <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
    <polygon points="15,0 0,30 30,30" fill="#2ecc71" />
  </svg>
);

const ShapeCounter = ({ shapes }) => {
  const counts = shapes.reduce((acc, shape) => {
    acc[shape.type] = (acc[shape.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="shape-counter">
      {Object.entries(counts).map(([type, count]) => (
        <div key={type}>
          {type === 'Square' && <SquareIcon />}
          {type === 'Circle' && <CircleIcon />}
          {type === 'Triangle' && <TriangleIcon />}
          {count}
        </div>
      ))}
    </div>
  );
};

export default ShapeCounter;
