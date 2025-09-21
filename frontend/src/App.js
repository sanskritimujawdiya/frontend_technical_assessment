// App.js - Updated with styling
import React from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './components/BaseNode.css';

function App() {
  return (
    <div className="app-container">
      <div className="pipeline-container">
        <div className="pipeline-sidebar">
          <PipelineToolbar />
          <SubmitButton />
        </div>
        <div className="pipeline-main">
          <PipelineUI />
        </div>
      </div>
    </div>
  );
}

export default App;
