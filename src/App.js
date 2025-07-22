import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import ShapeCounter from './components/ShapeCounter';
import './App.css';

function App() {
  const [shapes, setShapes] = useState([]);
  const [dragShape, setDragShape] = useState(null);

  const handleSelect = (shape) => {
    setDragShape(shape);
  };

  const handleDropShape = (shape, x, y) => {
    setShapes([...shapes, { type: shape, x, y }]);
  };

  const handleDeleteShape = (index) => {
    setShapes(shapes.filter((_, i) => i !== index));
  };

  const handleExport = () => {
    const data = JSON.stringify(shapes);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'drawing.json';
    a.click();
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const reader = new FileReader();
      reader.onload = () => {
        setShapes(JSON.parse(reader.result));
      };
      reader.readAsText(e.target.files[0]);
    };
    input.click();
  };

  return (
    <div className="App">
      <Header onExport={handleExport} onImport={handleImport} />
      <div className="main-content">
        <Sidebar onSelect={handleSelect} />
        <Canvas shapes={shapes} onDropShape={handleDropShape} onDeleteShape={handleDeleteShape} />
      </div>
      <ShapeCounter shapes={shapes} />
    </div>
  );
}

export default App;