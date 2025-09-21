// outputNode.js - Updated to use BaseNode
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const inputs = [
    { id: 'value', position: Position.Left, top: '50%', color: '#8b5cf6' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={inputs}
      className="output-node"
    >
      <div className="output-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Name:</span>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="node-input"
            placeholder="Enter output name"
          />
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Type:</span>
          <select value={outputType} onChange={handleTypeChange} className="node-select">
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
            <option value="Boolean">Boolean</option>
            <option value="JSON">JSON</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export default OutputNode;