// llmNode.js - Updated to use BaseNode
import React from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {
  const inputs = [
    { id: 'system', position: Position.Left, top: '25px', color: '#f59e0b' },
    { id: 'prompt', position: Position.Left, top: '75px', color: '#8b5cf6' }
  ];

  const outputs = [
    { id: 'response', position: Position.Right, top: '50%', color: '#10b981' }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={inputs}
      outputs={outputs}
      className="llm-node"
    >
      <div className="llm-node-content">
        <div className="llm-info">
          <span>🤖 Large Language Model</span>
        </div>
        <div className="llm-ports">
          <small>🟡 System Message</small>
          <small>🟣 User Prompt</small>
        </div>
      </div>
    </BaseNode>
  );
};

export default LLMNode;