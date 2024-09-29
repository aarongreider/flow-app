//#region IMPORTS
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

import { getPageIndex, getProjectIndex, Page, PagePath, Project } from '../types';
import { nanoid } from 'nanoid';
import { ChipSet, Chip } from '../types';
import { createReactFlowSLice } from './sliceReactFlow';
import { createProjectMgmtSlice } from './sliceProjectMgmt';
import { createChipsSlice } from './sliceChips';
//#endregion

// reactflow default state type
type RFState = {
  nodes: Node[];
  edges: Edge[];
  user: User | null;
  activePath: PagePath | undefined;
  projectChipSets: ChipSet[] | undefined;
  activeChipSet: ChipSet | undefined;
  register: Project[];
  lastChange: Date;
  lastSave: Date;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  getNode: (id: string) => Node | undefined;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeID: string, props: object) => void;
  deleteNodeData: (nodeID: string, props: object) => void;
  updateUser: (user: User) => void;
  setActivePath: (path: PagePath) => void;
  setActiveChipSet: (chipSet: ChipSet) => void;
  setChips: (chipSets: ChipSet[]) => void;
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
  ...createReactFlowSLice(set, get),
  ...createProjectMgmtSlice(set, get),
  ...createChipsSlice(set, get),

  user: null,
  updateUser: (user: User) => {
    set({ user });
  },

}));

export default useStore;