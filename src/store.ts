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
  updateNodeText: (nodeID: string, props: object) => void;
};

// Ensure initial nodes and edges exist in localStorage, if not assign inital values
if (!localStorage.getItem('nodes') || !localStorage.getItem('edges')) {
  localStorage.setItem('nodes', JSON.stringify(initialNodes))
  localStorage.setItem('edges', JSON.stringify(initialEdges))
}
let lsNode = localStorage.getItem('nodes') ?? ''
let lsEdge = localStorage.getItem('edges') ?? ''

// Retrieve nodes and edges from localStorage or use initial values
const storedNodes: Node[] = JSON.parse(lsNode) ?? initialNodes;
const storedEdges: Edge[] = JSON.parse(lsEdge) ?? initialEdges;


// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: storedNodes,
  edges: storedEdges,
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
  updateNodeText: (nodeId: string, props: object) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          return { ...node, data: { ...node.data, ...props } };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
