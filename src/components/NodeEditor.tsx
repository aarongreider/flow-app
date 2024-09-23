//#region imports
import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  //MiniMap,
  Background,
  SelectionMode,
  Panel,
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import { nanoid } from 'nanoid';
import useStore from '../store';

import 'reactflow/dist/style.css';

import DialogueNode from './DialogueNode';
import ResponseNode from './ResponseNode';
import ExpositionNode from './ExpositionNode';
import MetaNode from './MetaNode';
import SignalNode from './SignalNode';
import TextReceiverNode from './TextReceiverNode';
import CustomEdge from './EdgeButton';
import Firebase from '../Firebase';
import TokenNode from './TokenNode';
import ProjectsPopup from './ProjectsPopup';

import '../css/general.css'
import '../css/components.css'
import '../css/nodeStyles.css';


//#endregion

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
  meta: MetaNode,
  signal: SignalNode,
  token: TokenNode,
};
const edgeTypes = { customEdge: CustomEdge };

export default function NodeEditor() {

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
  const activePath = useStore((state) => state.activePath);
  const setNodes = useStore((state) => state.setNodes);
  const updatePageName = useStore((state) => state.updatePageName);

  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);



  //#region boilerplate and utils
  useEffect(() => {
    // keep tabs on window resizes to check if user is mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770); // Adjust the width threshold as needed
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    window.addEventListener('touchstart', function (event) {
      // Handle touchstart event here
      event.preventDefault();
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // this is a bit of a hacky way to force the viewport to initialize itself
    // otherwise, it won't initialize until a node is moved or added
    setNodes([...nodes])
    //console.log("first refresh of nodes")
  }, [reactFlowInstance])

  useEffect(() => {
    // set the nodes in localstorage
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [nodes, edges])



  const printState = () => {
    console.log(nodes)
  }

  const addNode = (type: string, xPos: number = 0, yPos: number = 100) => {
    setNodes([...nodes, { id: nanoid(), position: { x: xPos, y: yPos }, data: {}, type: type }])
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
    //console.log("on drop", event)
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
  }, [nodes]);

  const togglePageList = () => {
    let toggle = !registerVisible;
    setRegisterVisible(toggle);
  }

  const doThing = () =>{
    //console.log(findProjectKeyFromName('project 1'))
    
    updatePageName("project 1", "new page", "page 1")
  }
  //#endregion

  return (
    <ReactFlowProvider>

      <div style={{ width: '100svw', height: '100svh' }}>
        <Firebase />
        <ProjectsPopup visible={registerVisible} toggleVisible={togglePageList}/>
        <p style={{position: "absolute", right: "50%", top: 0, fontSize:".75em"}}>{activePath ? `${activePath.projectKey} / ${activePath.pageKey}`: "undefined"}</p>

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
          minZoom={.25}
          maxZoom={2}
          fitView
        >

          {/* <Controls style={{ top: '0', left: 'auto', right: '0', bottom: 'auto', display: 'flex' }} /> */}
          {/* {isMobile ? undefined : <MiniMap zoomable pannable />} */}
          <Panel position="bottom-right" style={{ display: "flex", gap: '8px', flexDirection: 'column', bottom: '10px'}}>
            <button onClick={togglePageList} style={{zIndex: 101}}>
              <span className="material-symbols-outlined">description</span>
            </button>
            <button onClick={doThing} style={{zIndex: 101}}>
              <span className="material-symbols-outlined">token</span>
            </button>
          </Panel>

          <Background gap={12} size={1} />

          <Panel position="top-left" style={{ display: "flex", gap: '8px', flexDirection: 'column',/*  left: '10px', top: '10px' */ }}>
            {isMobile ? undefined : <button onClick={printState}>Print State</button>}
            <button onClick={() => { addNode('dialogue') }} onDragStart={(event) => onDragStart(event, 'dialogue')} draggable>
              <span className="material-symbols-outlined">maps_ugc </span> {isMobile ? undefined : "Add Dialogue"}
            </button>
            <button onClick={() => { addNode('response') }} onDragStart={(event) => onDragStart(event, 'response')} draggable>
              <span className="material-symbols-outlined">comic_bubble</span>{isMobile ? undefined : "Add Response"}
            </button>
            <button onClick={() => { addNode('exposition') }} onDragStart={(event) => onDragStart(event, 'exposition')} draggable>
              <span className="material-symbols-outlined">local_library</span>{isMobile ? undefined : 'Add Exposition'}
            </button>
            <button onClick={() => { addNode('meta') }} onDragStart={(event) => onDragStart(event, 'meta')} draggable>
              <span className="material-symbols-outlined">select_all</span>{isMobile ? undefined : "Add Meta Node"}
            </button>
            <button onClick={() => { addNode('signal') }} onDragStart={(event) => onDragStart(event, 'signal')} draggable>
              <span className="material-symbols-outlined">sensors</span>{isMobile ? undefined : "Add Signal"}
            </button>
            <button onClick={() => { addNode('token') }} onDragStart={(event) => onDragStart(event, 'token')} draggable>
              <span className="material-symbols-outlined">{/* poker_chip */} {/* deployed_code */} key_vertical</span>{isMobile ? undefined : "Add Token"}
            </button>
          </Panel>

        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}