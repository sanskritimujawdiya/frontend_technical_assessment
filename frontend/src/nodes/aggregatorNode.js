// aggregatorNode.js - Combines multiple inputs
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const AggregatorNode = ({ id, data }) => {
  const [aggregationType, setAggregationType] = useState(data?.aggregationType || 'concatenate');
  const [separator, setSeparator] = useState(data?.separator || ', ');
  const [inputCount, setInputCount] = useState(data?.inputCount || 4);

  const handleAggregationTypeChange = (e) => {
    setAggregationType(e.target.value);
  };

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  const handleInputCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (count >= 2 && count <= 8) {
      setInputCount(count);
    }
  };

  // Generate dynamic inputs based on inputCount
  const inputs = Array.from({ length: inputCount }, (_, index) => ({
    id: `input-${index + 1}`,
    position: Position.Left,
    top: `${20 + index * 20}px`,
    color: '#3b82f6'
  }));

  const outputs = [
    { id: 'aggregated-output', position: Position.Right, top: '50%', color: '#10b981' }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Aggregator" 
      inputs={inputs} 
      outputs={outputs} 
      className="aggregator-node"
    >
      <div className="aggregator-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Operation:</span>
          <select 
            value={aggregationType} 
            onChange={handleAggregationTypeChange}
            className="node-select"
          >
            <option value="concatenate">Concatenate</option>
            <option value="sum">Sum (Numbers)</option>
            <option value="average">Average (Numbers)</option>
            <option value="max">Maximum (Numbers)</option>
            <option value="min">Minimum (Numbers)</option>
            <option value="count">Count Items</option>
            <option value="join_array">Join as Array</option>
            <option value="merge_objects">Merge Objects</option>
          </select>
        </label>

        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Input Count:</span>
          <input
            type="number"
            value={inputCount}
            onChange={handleInputCountChange}
            min="2"
            max="8"
            className="node-input"
            style={{ width: '80px' }}
          />
        </label>

        {(aggregationType === 'concatenate' || aggregationType === 'join_array') && (
          <label>
            <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>
              {aggregationType === 'join_array' ? 'Array Separator:' : 'Separator:'}
            </span>
            <input
              type="text"
              value={separator}
              onChange={handleSeparatorChange}
              placeholder="e.g., ', ' or ' | '"
              className="node-input"
            />
          </label>
        )}

        <div style={{ marginTop: '8px', fontSize: '10px', opacity: 0.7 }}>
          <small>🔵 {inputCount} Dynamic Inputs</small>
        </div>
      </div>
    </BaseNode>
  );
};

export default AggregatorNode;