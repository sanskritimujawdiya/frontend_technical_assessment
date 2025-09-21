// transformNode.js - Transforms data format
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customPattern, setCustomPattern] = useState(data?.customPattern || '');
  const [replacement, setReplacement] = useState(data?.replacement || '');

  const inputs = [
    { id: 'input', position: Position.Left, top: '50%', color: '#8b5cf6' }
  ];

  const outputs = [
    { id: 'output', position: Position.Right, top: '50%', color: '#10b981' }
  ];

  const handleTransformChange = (e) => {
    setTransformType(e.target.value);
  };

  const handlePatternChange = (e) => {
    setCustomPattern(e.target.value);
  };

  const handleReplacementChange = (e) => {
    setReplacement(e.target.value);
  };

  const showCustomFields = transformType === 'replace' || transformType === 'regex';

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Transform" 
      inputs={inputs} 
      outputs={outputs} 
      className="transform-node"
    >
      <div className="transform-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Transform Type:</span>
          <select 
            value={transformType} 
            onChange={handleTransformChange}
            className="node-select"
          >
            <option value="uppercase">UPPERCASE</option>
            <option value="lowercase">lowercase</option>
            <option value="capitalize">Capitalize</option>
            <option value="title_case">Title Case</option>
            <option value="reverse">Reverse</option>
            <option value="trim">Trim Whitespace</option>
            <option value="remove_spaces">Remove Spaces</option>
            <option value="replace">Find & Replace</option>
            <option value="regex">Regex Replace</option>
            <option value="json_parse">Parse JSON</option>
            <option value="json_stringify">Stringify JSON</option>
          </select>
        </label>

        {showCustomFields && (
          <>
            <label>
              <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>
                {transformType === 'regex' ? 'Regex Pattern:' : 'Find:'}
              </span>
              <input
                type="text"
                value={customPattern}
                onChange={handlePatternChange}
                placeholder={transformType === 'regex' ? 'Enter regex pattern' : 'Text to find'}
                className="node-input"
              />
            </label>
            <label>
              <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Replace With:</span>
              <input
                type="text"
                value={replacement}
                onChange={handleReplacementChange}
                placeholder="Replacement text"
                className="node-input"
              />
            </label>
          </>
        )}

        <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
          <small>🟣 Text Input</small>
        </div>
      </div>
    </BaseNode>
  );
};

export default TransformNode;