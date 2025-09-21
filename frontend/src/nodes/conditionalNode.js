// conditionalNode.js - Implements if-then-else logic
import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  const inputs = [
    { id: 'condition-input', position: Position.Left, top: '25px', color: '#f59e0b' },
    { id: 'true-input', position: Position.Left, top: '50px', color: '#10b981' },
    { id: 'false-input', position: Position.Left, top: '75px', color: '#ef4444' }
  ];

  const outputs = [
    { id: 'output', position: Position.Right, top: '50%', color: '#6366f1' }
  ];

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const handleCompareValueChange = (e) => {
    setCompareValue(e.target.value);
  };

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Conditional" 
      inputs={inputs} 
      outputs={outputs} 
      className="conditional-node"
    >
      <div className="conditional-node-content">
        <label>
          <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Operator:</span>
          <select 
            value={operator} 
            onChange={handleOperatorChange}
            className="node-select"
          >
            <option value="equals">Equals (==)</option>
            <option value="not_equals">Not Equals (!=)</option>
            <option value="greater">Greater Than (&gt;)</option>
            <option value="less">Less Than (&lt;)</option>
            <option value="greater_equal">Greater or Equal (&gt;=)</option>
            <option value="less_equal">Less or Equal (&lt;=)</option>
            <option value="contains">Contains</option>
            <option value="is_empty">Is Empty</option>
            <option value="is_not_empty">Is Not Empty</option>
          </select>
        </label>

        {operator !== 'is_empty' && operator !== 'is_not_empty' && (
          <label>
            <span style={{ display: 'block', marginBottom: '4px', fontSize: '12px', opacity: 0.8 }}>Compare Value:</span>
            <input
              type="text"
              value={compareValue}
              onChange={handleCompareValueChange}
              placeholder="Value to compare against"
              className="node-input"
            />
          </label>
        )}

        <div className="condition-labels">
          <small>🟡 Value to Check</small>
          <small>🟢 If True</small>
          <small>🔴 If False</small>
        </div>
      </div>
    </BaseNode>
  );
};

export default ConditionalNode;