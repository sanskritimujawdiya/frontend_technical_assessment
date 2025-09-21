// toolbar.js - Updated with all node types
import React from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="toolbar-title">Node Library</div>
      <div className="draggable-nodes">
        {/* Original Nodes */}
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        
        {/* New Nodes */}
        <DraggableNode type='math' label='Math' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='transform' label='Transform' />
        <DraggableNode type='conditional' label='Conditional' />
        <DraggableNode type='aggregator' label='Aggregator' />
      </div>
    </div>
  );
};
