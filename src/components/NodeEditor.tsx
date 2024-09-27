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
import useStore from '../store/store';
import { PopupContainer } from './ProjectsPopup';
import { useParams } from 'react-router-dom';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { selector, nodeTypes, edgeTypes, useWindowResizer, useActivePathEffect, getChipName } from '../nodeEditorUtils';

import 'reactflow/dist/style.css';
import '../css/general.css'
import '../css/components.css'
import '../css/nodeStyles.css';
import { NodePanel } from './PanelNodes';
import { ActionsPanel } from './PanelActions';
import ChipsDashboard from './chips/ChipsDashboard';


//#endregion



export default function NodeEditor() {
    //#region init variables
    const { edges, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow);
    const activePath = useStore((state) => state.activePath);
    const nodes = useStore((state) => state.nodes);
    const lastChange = useStore((state) => state.lastChange);
    const lastSave = useStore((state) => state.lastSave);
    const projectChipSets = useStore((state) => state.projectChipSets);

    const setNodes = useStore((state) => state.setNodes);
    const updateNodeData = useStore((state) => state.updateNodeData);
    const setActivePath = useStore((state) => state.setActivePath);
    const setLastChange = useStore((state) => state.setLastChange);

    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [chipsVisible, setChipsVisible] = useState(false);

    const { projectKey, pageKey } = useParams();

    useWindowResizer(setIsMobile);
    useActivePathEffect(projectKey, pageKey, setActivePath);
    //#endregion

    //#region useEffect
    useEffect(() => { /* INIT NODES ON LOAD */
        // this is a bit of a hacky way to force the viewport to initialize itself
        // otherwise, it won't initialize until a node is moved or added
        setNodes([...nodes])
    }, [reactFlowInstance])

    useEffect(() => { /* LOCAL STORAGE */
        // set the nodes in localstorage
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
        setLastChange(new Date);
    }, [nodes, edges])

    useEffect(() => { /* BEFORE UNLOAD */
        // evaluate and set the before unload listener
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (lastChange > lastSave) {
                event.preventDefault();
                event.returnValue = ''; // Standard for preventing navigation
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [lastSave, lastChange])
    //#endregion

    //#region functions

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
    const toggleChips = () => {
        let toggle = !chipsVisible
        setChipsVisible(toggle);
    }

    const doThing = () => {
    }
    //#endregion

    const handleDragEnd = (e: DragEndEvent) => {
        // for dnd-kit dragging
        const { active, over } = e;

        if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
            // do stuff
            /* console.log("OVER")
            console.log(over);
            console.log(active); */

            //TODO: eventually this will have to be a register of node id's matched with the chip id so they can be managed in state (and thus be renameable)
            // for now it's just a text string that will not update with state changes 
            projectChipSets ? updateNodeData(`${over.id}`, { [`setKey`]: active.data.current?.setKey, [`chipKey`]: active.data.current?.chipKey })
                : undefined;

            /* console.log(nodes.find(node => node.id === over.id)); */
        } 
    }

    return (
        /* if no params exist, prompt user to create a new page */
        <ReactFlowProvider>

            <div style={{ width: '100svw', height: '100svh', display: 'flex', flexDirection: 'column' }}>
                <p style={{ position: "absolute", bottom: 0, fontSize: ".75em" }}>{activePath ? `${activePath.projectKey} / ${activePath.pageKey}` : "undefined"}</p>
                <PopupContainer visible={registerVisible} toggleVisible={togglePageList} />

                <DndContext onDragEnd={handleDragEnd}>
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
                    /* fitView */
                    >
                        <NodePanel isMobile={isMobile} addNode={addNode} onDragStart={onDragStart}></NodePanel>
                        <ActionsPanel togglePageList={togglePageList} toggleChips={toggleChips} doThing={doThing}></ActionsPanel>
                        {/* <Controls style={{ top: '0', left: 'auto', right: '0', bottom: 'auto', display: 'flex' }} /> */}
                        {/* {isMobile ? undefined : <MiniMap zoomable pannable />} */}
                        <Background gap={12} size={1} />
                    </ReactFlow>
                    <ChipsDashboard visible={chipsVisible}></ChipsDashboard>
                </DndContext>
            </div>
        </ReactFlowProvider>
    );
}