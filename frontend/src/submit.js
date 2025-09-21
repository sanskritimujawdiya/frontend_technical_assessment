// submit.js - Updated with backend integration
import React from "react";
import { useStore } from "./store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSubmit = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      // Prepare the data to send to backend
      const pipelineData = {
        nodes: nodes,
        edges: edges,
      };

      // Send POST request to backend
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Show toast with the results
      toast.success(
        <div>
          <strong>Pipeline Analysis Results:</strong>
          <div>
            📊 <strong>Number of Nodes:</strong> {result.num_nodes}
          </div>
          <div>
            🔗 <strong>Number of Edges:</strong> {result.num_edges}
          </div>
          <div>
            🌐 <strong>Is DAG (Directed Acyclic Graph):</strong>{" "}
            {result.is_dag ? "Yes ✅" : "No ❌ (Contains cycles)"}
          </div>
          <div>
            {result.is_dag
              ? "Great! Your pipeline is valid and can be executed."
              : "Warning: Your pipeline contains cycles and may not execute properly."}
          </div>
        </div>
      );
    } catch (error) {
      toast.error(
        <div>
          <strong>Error:</strong> Failed to analyze pipeline
          <div>{error.message}</div>
          <div>
            Make sure the backend server is running on{" "}
            <strong>http://localhost:8000</strong>
          </div>
        </div>
      );
    }
  };

  return handleSubmit;
};

export const SubmitButton = () => {
  const handleSubmit = useSubmit();

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="submit-button"
    >
      🚀 Analyze Pipeline
    </button>
  );
};
