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
import { getPageIndex, getProjectIndex, Project } from './types';
import { nanoid } from 'nanoid';

// reactflow default state type
type RFState = {
  nodes: Node[];
  edges: Edge[];
  user: User | null;
  projectID: string;
  pageID: string;
  register: Project[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeText: (nodeID: string, props: object) => void;
  updateUser: (user: User) => void;
  setProjectID: (id: string) => void;
  setPageID: (id: string) => void;
  setRegister: (register: Project[]) => void;
  updatePageName: (project: string, oldPageName: string, newPageName: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  /* REACTFLOW VARIABLES */
  nodes: initialNodes,
  edges: initialEdges,
  projectID: "project 1",
  pageID: "page 1",
  /* CUSTOM VARIABLES */
  user: null,
  register: [
    {
        name: 'project 1',
        pages: [{ name: 'page1', key: nanoid() }, { name: 'page2', key: nanoid() }, { name: 'page3', key: nanoid() },]
    },
    {
        name: 'project 2',
        pages: [{ name: 'page1', key: nanoid() }, { name: 'page2', key: nanoid() }, { name: 'page3', key: nanoid() },]
    },
],

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
    set({ user });
  },
  setProjectID: (id: string) => {
    set({ projectID: id });
  },
  setPageID: (id: string) => {
    console.log(id);

    set({ pageID: id });
  },
  setRegister: (register: Project[]) => {
    set({ register })
  },
  updatePageName: (projectName: string, oldPageName: string, newPageName: string, ) => {
    const register = [ ...get().register ]
    console.log("register before:", register);

    console.log(projectName, newPageName, );
    

    const projectIndex = getProjectIndex(register, projectName);
    const pageIndex = getPageIndex(register, projectIndex, oldPageName);
    console.log("project index: ",  projectIndex, "page index: ", pageIndex);
    
    register[projectIndex].pages[pageIndex].name = newPageName

    console.log("register after:", register);

    set({ register })
  },
}));

export default useStore;