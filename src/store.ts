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
import { getPageIndex, getProjectIndex, Page, PagePath, Project } from './types';
import { nanoid } from 'nanoid';

// reactflow default state type
type RFState = {
  nodes: Node[];
  edges: Edge[];
  user: User | null;
  activePath: PagePath | undefined;
  register: Project[];
  lastChange: Date;
  lastSave: Date;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeText: (nodeID: string, props: object) => void;
  updateUser: (user: User) => void;
  setActivePath: (path: PagePath) => void;
  setRegister: (register: Project[]) => void;
  updateProjectName: (projectKey: string, newProjectName: string) => void;
  updatePageName: (projectKey: string, oldPageName: string, newPageName: string) => void;
  addPage: (projectKey: string, pageName: string, pageKey?: string) => void;
  addProject: (projectName: string, projectKey?: string, pages?: Page[]) => void;
  setLastChange: (lastChange: Date) => void;
  setLastSave: (lastSave: Date) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  /* REACTFLOW VARIABLES */
  nodes: initialNodes,
  edges: initialEdges,
  activePath: undefined, //{projectKey: '', pageKey: ''},
  /* CUSTOM VARIABLES */
  user: null,
  register: [],
  lastChange: new Date,
  lastSave: new Date,


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
  setActivePath: (path: PagePath) => {
    set({ activePath: path })
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
  setRegister: (register: Project[]) => {
    set({ register })
  },
  updateProjectName: (projectKey: string, newProjectName: string) => {
    const register = [...get().register]
    //console.log("register before:", register);

    const projectIndex = getProjectIndex(register, projectKey);
    register[projectIndex].name = newProjectName;

    //console.log("register after:", register);

    set({ register })
  },
  updatePageName: (projectKey: string, pageKey: string, newPageName: string,) => {
    const register = [...get().register]
    //console.log("register before:", register);

    const projectIndex = getProjectIndex(register, projectKey);
    const pageIndex = getPageIndex(register, projectIndex, pageKey);
    register[projectIndex].pages[pageIndex].name = newPageName

    //console.log("register after:", register);

    set({ register })
  },
  addPage: (projectKey: string, pageName: string, pageKey?: string) => {
    const newRegister = [...get().register] // shallow clone of register
    const projectIndex = getProjectIndex(newRegister, projectKey);
    const newPage: Page = { name: pageName, key: pageKey ?? nanoid() }

    if (projectIndex !== -1) {
      // deep clone the project being modified
      const updatedProject = {
        ...newRegister[projectIndex],
        pages: [...newRegister[projectIndex].pages, newPage] // create a new array with the new page
      };
      // Replace the specific project in the register array
      newRegister[projectIndex] = updatedProject;
      set({ register: newRegister })
    } else {
      // else push new project to the register project array
      get().addProject(projectKey, undefined, [newPage])
    }

  },
  addProject: (projectName: string, projectKey?: string, pages?: Page[]) => {
    const newRegister = [...get().register] // shallow clone of register

    newRegister.push({ name: projectName, key: projectKey ?? nanoid(), pages: pages ?? [], tokens: [] })
    set({ register: newRegister })
  },
  setLastChange: (lastChange: Date) => {
    set({ lastChange })
  },
  setLastSave: (lastSave: Date) => {
    set({ lastSave })
  }
}));

export default useStore;