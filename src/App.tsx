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
} from 'reactflow';

import 'reactflow/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';
import './css/text-updater-node.css';


const initialNodes = [
  { id: '1', position: { x: 10, y: 0 }, data: { label: '1' }, type: 'textUpdater' },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
//const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// define the nodeTypes outside of the component to prevent re-renderings
// could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([/* initialEdges */]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

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
      </ReactFlow>
    </div>
  );
}