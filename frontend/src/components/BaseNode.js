// BaseNode.js - Reusable Node abstraction
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './BaseNode.css';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  inputs = [], 
  outputs = [], 
  children,
  className = '',
  showHandles = true 
}) => {
  return (
    <div className={`base-node ${className}`}>
      {/* Input Handles */}
      {showHandles && inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={input.position || Position.Left}
          id={input.id || `input-${index}`}
          style={{
            top: input.top || `${20 + index * 30}px`,
            background: input.color || '#555'
          }}
        />
      ))}
      
      {/* Node Header */}
      <div className="base-node-header">
        <span className="base-node-title">{title}</span>
      </div>
      
      {/* Node Content */}
      <div className="base-node-content">
        {children}
      </div>
      
      {/* Output Handles */}
      {showHandles && outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={output.position || Position.Right}
          id={output.id || `output-${index}`}
          style={{
            top: output.top || `${20 + index * 30}px`,
            background: output.color || '#555'
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
