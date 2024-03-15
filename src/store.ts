import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

import { initialNodes, initialEdges } from './nodes';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeText: (nodeID: string, character?: string, dialogue?: string) => void;
};

if (!localStorage.getItem('nodes') || !localStorage.getItem('edges')) {
  localStorage.setItem('nodes', JSON.stringify(initialNodes))
  localStorage.setItem('edges', JSON.stringify(initialEdges))
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: JSON.parse(localStorage.getItem('nodes')),
  edges: JSON.parse(localStorage.getItem('edges')),
  /* REACTFLOW STORE SETTERS */
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, type: 'customEdge' }, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  /* CUSTOM STORE SETTERS */
  updateNodeText: (nodeId: string, character: string, dialogue: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          return { ...node, data: { ...node.data, character: character, dialogue: dialogue } };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
