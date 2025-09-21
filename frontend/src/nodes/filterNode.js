// filterNode.js - Filters data based on conditions
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [filterValue, setFilterValue] = useState(data?.filterValue || '');
  const [caseSensitive, setCaseSensitive] = useState(data?.caseSensitive || false);

  const inputs = [
    { id: 'data-input', position: Position.Left, top: '50%', color: '#3b82f6' }
  ];

  const outputs = [
    { id: 'filtered-output', position: Position.Right, top: '50%', color: '#10b981' }
  ];

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleCaseSensitiveChange = (e) => {
    setCaseSensitive(e.target.checked);
  };

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Filter" 
      inputs={inputs} 
      outputs={outputs} 
      className="filter-node"
    >
      <div className="filter-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Condition:</span>
          <select 
            value={condition} 
            onChange={handleConditionChange}
            className="node-select"
          >
            <option value="equals">Equals</option>
            <option value="not_equals">Not Equals</option>
            <option value="contains">Contains</option>
            <option value="not_contains">Not Contains</option>
            <option value="starts_with">Starts With</option>
            <option value="ends_with">Ends With</option>
            <option value="greater">Greater Than</option>
            <option value="less">Less Than</option>
            <option value="greater_equal">Greater or Equal</option>
            <option value="less_equal">Less or Equal</option>
          </select>
        </label>
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Filter Value:</span>
          <input
            type="text"
            value={filterValue}
            onChange={handleValueChange}
            placeholder="Enter filter value"
            className="node-input"
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={handleCaseSensitiveChange}
            style={{ margin: 0 }}
          />
          <span style={{ fontSize: '12px', opacity: 0.8 }}>Case Sensitive</span>
        </label>
      </div>
    </BaseNode>
  );
};

export default FilterNode;