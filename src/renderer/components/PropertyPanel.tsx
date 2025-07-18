import React from 'react';

export const PropertyPanel: React.FC = () => {
  return (
    <div className="property-panel">
      <h3>속성</h3>
      <div className="property-group">
        <label>선 색상</label>
        <input type="color" defaultValue="#000000" />
      </div>
      <div className="property-group">
        <label>선 두께</label>
        <input type="range" min="1" max="10" defaultValue="1" />
      </div>
      <div className="property-group">
        <label>채우기 색상</label>
        <input type="color" defaultValue="#ffffff" />
      </div>
    </div>
  );
}; 