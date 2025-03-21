//#region IMPORTS
import { create } from 'zustand';
import { User } from "firebase/auth";
import {
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Viewport,
} from 'reactflow';

import { Chip, Page, PagePath, Project, XY } from '../utils/types';

import { ChipSet } from '../utils/types';
import { createReactFlowSLice } from './sliceReactFlow';
import { createProjectMgmtSlice } from './sliceProjectMgmt';
import { createChipsSlice } from './sliceChips';
//#endregion

// reactflow default state type
type RFState = {
  //reactflow
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  getNode: (id: string) => Node | undefined;
  setNodes: (nodes: Node[]) => void;
  appendNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (nodeID: string, props: object) => void;
  deleteNodeData: (nodeID: string, props: object) => void;
  toggleSelectedNode: (id: string) => void;
  deselectAllNodes: () => void;
  getSelectedNodes: () => Node[];
  isNodeSelected: (id: string) => boolean;

  //app state
  user: User | null;
  appLoaded: boolean;
  clientXY: XY;
  viewport: Viewport;
  updateUser: (user: User) => void;
  setAppLoaded: (appLoaded: boolean) => void;
  setClientXY: (xy: XY) => void;
  getViewport: () => Viewport;
  setViewport: (viewport: Viewport) => void;

  //chips
  projectChipSets: ChipSet[] | undefined;
  activeChipSet: ChipSet | undefined;
  setActiveChipSet: (chipSet: ChipSet) => void;
  setChips: (chipSets: ChipSet[]) => void;
  renameChip: (setKey: string, chipKey: string, newName: string) => void;
  renameChipSet: (setKey: string, newName: string) => void;
  addChip: (setKey: string, chip: Chip) => void;
  addChipSet: (chipSetName: string, chipSetKey?: string, chips?: Chip[]) => void;

  //register
  activePath: PagePath | undefined;
  register: Project[];
  lastChange: Date;
  lastSave: Date;
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
  ...createReactFlowSLice(set, get),
  ...createProjectMgmtSlice(set, get),
  ...createChipsSlice(set, get),

  user: null,
  updateUser: (user: User) => {
    set({ user });
  },

  appLoaded: false,
  setAppLoaded: (appLoaded: boolean) => {
    set({ appLoaded });
  },

  clientXY: { x: 0, y: 0 },
  setClientXY: (xy: XY) => {
    set({ clientXY: xy });
  },

  viewport: { x: 0, y: 0, zoom: 1 },
  getViewport: () => {
    return get().viewport
  },
  setViewport: (viewport: Viewport) => {
    set({ viewport })
  }

}));

export default useStore;