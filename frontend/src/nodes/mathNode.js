// mathNode.js - Performs mathematical operations
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || 0);

  const inputs = [
    { id: 'input-a', position: Position.Left, top: '30px', color: '#f59e0b' },
    { id: 'input-b', position: Position.Left, top: '60px', color: '#f59e0b' }
  ];

  const outputs = [
    { id: 'result', position: Position.Right, top: '45px', color: '#10b981' }
  ];

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Math" 
      inputs={inputs} 
      outputs={outputs} 
      className="math-node"
    >
      <div className="math-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Operation:</span>
          <select 
            value={operation} 
            onChange={handleOperationChange}
            className="node-select"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
            <option value="power">Power (^)</option>
            <option value="modulo">Modulo (%)</option>
          </select>
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Constant Value:</span>
          <input
            type="number"
            value={value}
            onChange={handleValueChange}
            placeholder="Optional constant"
            className="node-input"
          />
        </label>
        <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
          <small>🟡 Input A & B</small>
        </div>
      </div>
    </BaseNode>
  );
};

export default MathNode;