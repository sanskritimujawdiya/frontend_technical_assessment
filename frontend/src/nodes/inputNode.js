// inputNode.js - Updated to use BaseNode
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace('customInput-', 'input_')
  );
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const outputs = [
    { id: 'value', position: Position.Right, top: '50%', color: '#10b981' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={outputs}
      className="input-node"
    >
      <div className="input-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Name:</span>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="node-input"
            placeholder="Enter input name"
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Type:</span>
          <select value={inputType} onChange={handleTypeChange} className="node-select">
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
            <option value="Boolean">Boolean</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export default InputNode;