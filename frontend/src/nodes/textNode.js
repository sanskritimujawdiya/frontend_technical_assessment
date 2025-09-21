// textNode.js - Enhanced TextNode with dynamic sizing and variable handles
import React, { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import BaseNode from '../components/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [textareaHeight, setTextareaHeight] = useState(100);
  const [textareaWidth, setTextareaWidth] = useState(200);
  const textareaRef = useRef(null);

  // Extract variables from text like {{variable_name}}
  const extractVariables = (text) => {
    const regex = /{{\s*([^}]+)\s*}}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const variable = match[1].trim();
      if (!matches.includes(variable)) {
        matches.push(variable);
      }
    }
    return matches;
  };

  // Auto-resize textarea
  const autoResize = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      const newHeight = Math.max(100, textarea.scrollHeight + 10);
      setTextareaHeight(newHeight);
      
      // Calculate width based on content
      const context = document.createElement('canvas').getContext('2d');
      context.font = '14px Arial';
      const lines = textarea.value.split('\n');
      const maxWidth = Math.max(...lines.map(line => context.measureText(line).width));
      setTextareaWidth(Math.max(200, maxWidth + 40));
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    
    // Extract and update variables
    const newVariables = extractVariables(newText);
    setVariables(newVariables);
    
    // Auto-resize
    autoResize();
  };

  useEffect(() => {
    // Initialize variables on mount
    const initialVariables = extractVariables(currText);
    setVariables(initialVariables);
    autoResize();
  }, [currText]);

  // Create input handles for each variable
  const inputHandles = variables.map((variable, index) => ({
    id: `input-${variable}`,
    position: Position.Left,
    top: `${50 + index * 25}px`,
    color: '#8b5cf6'
  }));

  // Always have one output handle
  const outputHandles = [{
    id: 'output',
    position: Position.Right,
    top: '50%',
    color: '#10b981'
  }];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={inputHandles}
      outputs={outputHandles}
      className="text-node"
      style={{ width: textareaWidth }}
    >
      <div className="text-node-content">
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with variables like {{input}}"
          style={{
            width: `20rem`,
            height: `${textareaHeight}px`,
            minHeight: '100px',
            resize: 'none',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            fontFamily: 'inherit',
            color: 'inherit'
          }}
        />
        {variables.length > 0 && (
          <div className="variables-list">
            <small>Variables: {variables.join(', ')}</small>
          </div>
        )}
      </div>
    </BaseNode>
  );
};

export default TextNode;