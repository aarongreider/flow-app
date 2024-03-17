import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  SelectionMode,
  Panel
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import useStore from './store';

import 'reactflow/dist/style.css';

import DialogueNode from './DialogueNode';
import ResponseNode from './ResponseNode';
import ExpositionNode from './ExpositionNode';
import MetaNode from './MetaNode';
import TextReceiverNode from './TextReceiverNode';
import CustomEdge from './EdgeButton';

import './css/text-updater-node.css';


const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = {
  dialogue: DialogueNode,
  textReceiver: TextReceiverNode,
  response: ResponseNode,
  exposition: ExpositionNode,
  meta: MetaNode
};
const edgeTypes = { customEdge: CustomEdge };

export default function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  const setNodes = useStore((state) => state.setNodes);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [idCount, setIdCount] = useState<number>(nodes.length + 1)

  useEffect(() => {
    // this is a bit of a hacky way to force the viewport to initialize itself
    // otherwise, it won't initialize until a node is moved or added
    setNodes([...nodes])
    //console.log("first refresh of nodes")
  }, [reactFlowInstance])

  useEffect(() => {
    const newCount = idCount + 1;
    setIdCount(newCount)

    // set the nodes in localstorage
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [nodes, edges])

  const printState = () => {
    console.log(nodes)
  }

  const addNode = (type: string, xPos: number = 0, yPos: number = 100) => {
    setNodes([...nodes, { id: `${idCount}`, position: { x: xPos, y: yPos }, data: {}, type: type }])
  }

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    //console.log(event)
  };
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    //console.log("drag over", event)
  }, []);

  const onDrop = useCallback((event: any) => {
    event.preventDefault();
    console.log("on drop", event)
    const type = event.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    if (reactFlowInstance) {
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 100,
        y: event.clientY,
      });
      addNode(type, position.x, position.y)
    } else {
      addNode(type,);
    }
  },
    [nodes],
  );

  return (
    <ReactFlowProvider>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          onInit={setReactFlowInstance}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}

          onDrop={onDrop}
          onDragOver={onDragOver}
          selectionMode={SelectionMode.Partial}
          nodeTypes={nodeTypes} // DO NOT FORGET THIS PART
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
          <MiniMap zoomable pannable />
          <Background gap={12} size={1} />
          <Panel position="top-left"><button onClick={printState}>Print State</button></Panel>
          <Panel position="top-left" style={{ top: '50px' }}>
            <button onClick={() => { addNode('dialogue') }} onDragStart={(event) => onDragStart(event, 'dialogue')} draggable>Add Dialogue</button>
          </Panel>
          <Panel position="top-left" style={{ top: '100px' }}>
            <button onClick={() => { addNode('response') }} onDragStart={(event) => onDragStart(event, 'response')} draggable>Add Response</button>
          </Panel>
          <Panel position="top-left" style={{ top: '150px' }}>
            <button onClick={() => { addNode('exposition') }} onDragStart={(event) => onDragStart(event, 'exposition')} draggable>Add Exposition</button>
          </Panel>
          <Panel position="top-left" style={{ top: '200px' }}>
            <button onClick={() => { addNode('meta') }} onDragStart={(event) => onDragStart(event, 'meta')} draggable>Add Meta Node</button>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}