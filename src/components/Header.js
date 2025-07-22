import React from 'react';

const Header = ({ onExport, onImport }) => (
  <header className="header">
    <h1>Drawing App</h1>
    <button onClick={onExport}>Export</button>
    <button onClick={onImport}>Import</button>
  </header>
);

export default Header;
