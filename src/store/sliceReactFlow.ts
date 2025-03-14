import { initialNodes, initialEdges } from '../InitialNodes';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeSelectionChange,
} from 'reactflow';

export const createReactFlowSLice = (set: any, get: any) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodes: [],

  getNode: (id: string) => {
    //@ts-ignore
    return get().nodes.filter(node => node.id === id)[0]
  },

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
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  setNodes: (nodes: Node[]) => {
    set({
      nodes: nodes.map(node => (
        { ...node, data: { ...node.data } }
      ))
    });
  },
  //TODO: addNodes() method that appends an array of nodes
  updateNodeData: (nodeId: string, props: object) => {
    set({
      nodes: get().nodes.map((node: Node) => {
        if (node.id === nodeId) {
          // it's important to create a new object here, to inform React Flow about the changes
          return { ...node, data: { ...node.data, ...props } };
        }
        return node;
      }),
    });
  },
  deleteNodeData: (nodeId: string, props: object) => {
    set({
      nodes: get().nodes.map((node: Node) => {
        if (node.id === nodeId) {
          // Create a new object without the properties in props
          const { data } = node;
          const updatedData = { ...data };

          // Loop through the keys of props and delete them from updatedData
          Object.keys(props).forEach(key => {
            delete updatedData[key];
          });

          return { ...node, data: updatedData };
        }
        return node;
      }),
    });
  },
  toggleSelectedNode: (id: string) => {
    console.log(id, get().selectedNodes);

    const selectionChange: NodeSelectionChange = {
      id: id,
      type: 'select',
      selected: !get().selectedNodes.includes(id)
    };

    const changes: NodeChange[] = [selectionChange]

    get().onNodesChange(changes)

    set({
      selectedNodes: get().selectedNodes.includes(id)
        //@ts-ignore
        ? get().selectedNodes.filter(nodeId => nodeId !== id) // Remove only the selected id
        : [...get().selectedNodes, id] // Add new id
    })
  }
})