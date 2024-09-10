import { create } from 'zustand';
import { User } from "firebase/auth";
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
import { initialNodes, initialEdges } from './InitialNodes';

// reactflow default state type
type RFState = {
  nodes: Node[];
  edges: Edge[];
  user: User | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeText: (nodeID: string, props: object) => void;
  updateUser: (user: User) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  /* REACTFLOW VARIABLES */
  nodes: initialNodes,
  edges: initialEdges,

  /* CUSTOM VARIABLES */
  user: null,

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
  updateUser: (user: User) => {
    set({ user })
  }
}));

export default useStore;