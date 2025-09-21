# main.py - Updated backend with DAG analysis
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware to handle frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def has_cycle_dfs(graph, visited, rec_stack, node):
    """
    Detect cycle using DFS recursion stack approach
    """
    visited[node] = True
    rec_stack[node] = True
    
    # Visit all neighbors
    for neighbor in graph.get(node, []):
        if not visited.get(neighbor, False):
            if has_cycle_dfs(graph, visited, rec_stack, neighbor):
                return True
        elif rec_stack.get(neighbor, False):
            return True
    
    rec_stack[node] = False
    return False

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG)
    """
    if not edges:
        return True  # No edges means no cycles
    
    # Build adjacency list
    graph = {}
    node_ids = {node.id for node in nodes}
    
    # Initialize graph with all nodes
    for node in nodes:
        graph[node.id] = []
    
    # Add edges to graph
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
    
    # Check for cycles using DFS
    visited = {}
    rec_stack = {}
    
    for node_id in node_ids:
        visited[node_id] = False
        rec_stack[node_id] = False
    
    # Check each unvisited node
    for node_id in node_ids:
        if not visited[node_id]:
            if has_cycle_dfs(graph, visited, rec_stack, node_id):
                return False
    
    return True

@app.get('/')
def read_root():
    return {
        'message': 'VectorShift Pipeline API', 
        'status': 'running',
        'version': '1.0.0'
    }

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline_data: PipelineData):
    """
    Parse pipeline and return analysis
    """
    try:
        nodes = pipeline_data.nodes
        edges = pipeline_data.edges
        
        # Calculate basic metrics
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Determine if graph is a DAG
        is_dag_result = is_dag(nodes, edges)
        
        # Log for debugging
        print(f"Pipeline analysis: {num_nodes} nodes, {num_edges} edges, DAG: {is_dag_result}")
        
        # Log node types for debugging
        node_types = [node.type for node in nodes]
        print(f"Node types: {node_types}")
        
        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result,
            "node_types": node_types
        }
        
    except Exception as e:
        print(f"Error processing pipeline: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing pipeline: {str(e)}")

# Health check endpoint
@app.get('/health')
def health_check():
    return {
        'status': 'healthy', 
        'message': 'Backend is running successfully',
        'endpoints': ['/pipelines/parse', '/health']
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)