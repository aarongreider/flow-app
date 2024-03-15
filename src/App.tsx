import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  applyEdgeChanges, applyNodeChanges,
  addEdge,
  SelectionMode,
  useReactFlow,
  Panel
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import useStore from './store';

import 'reactflow/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';
import './css/text-updater-node.css';

import TextReceiverNode from './TextReceiverNode';




// define the nodeTypes outside of the component to prevent re-renderings
// could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode, textReceiver: TextReceiverNode };

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  const setNodes = useStore((state) => state.setNodes);

  const printState = () => {
    console.log(nodes)
  }

  const addNode = () => {
    setNodes([...nodes, { id: '3', position: { x: 0, y: 100 }, data: { label: '3' }, type: 'textUpdater' }])
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        selectionMode={SelectionMode.Partial}
        nodeTypes={nodeTypes} // DO NOT FORGET THIS PART
        fitView
      >
        <Controls />
        <MiniMap zoomable pannable />
        <Background gap={12} size={1} />
        <Panel position="top-left"><button onClick={printState}>Print State</button></Panel>
        <Panel position="top-right"><button onClick={addNode}>Add Input Node</button></Panel>
      </ReactFlow>
    </div>
  );
}