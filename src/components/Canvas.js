import React from 'react';

const Canvas = ({ shapes, onDropShape, onDeleteShape }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const shape = e.dataTransfer.getData("shape");
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
  
   
    const shapeSize = 50; 
  
    x = Math.max(0, Math.min(x, rect.width - shapeSize));
    y = Math.max(0, Math.min(y, rect.height - shapeSize)); 
  
    onDropShape(shape, x, y);
  };
  

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="canvas"
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          onDoubleClick={() => onDeleteShape(index)}
          className={shape.type.toLowerCase()}
          style={{
            left: shape.x,
            top: shape.y,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Canvas;
