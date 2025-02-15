import { Panel } from 'reactflow';

interface PanelProps {
    isMobile: boolean;
    addNode: (nodeType: string) => void;
    onDragStart: (e: React.DragEvent<HTMLButtonElement>, nodeType: string) => void;
}


export function NodePanel({ isMobile, addNode, onDragStart }: PanelProps) {
    return <Panel position="top-left" style={{ display: "flex", gap: '8px', flexDirection: 'column',/*  left: '10px', top: '10px' */ }}>
        <button className="nodeTypePanel" onClick={() => { addNode('dialogue') }} onDragStart={(event) => onDragStart(event, 'dialogue')} draggable>
            <span className="material-symbols-rounded">maps_ugc </span> {isMobile ? undefined : "Add Dialogue"}
        </button>
        <button className="nodeTypePanel" onClick={() => { addNode('response') }} onDragStart={(event) => onDragStart(event, 'response')} draggable>
            <span className="material-symbols-rounded">comic_bubble</span>{isMobile ? undefined : "Add Response"}
        </button>
        <button className="nodeTypePanel" onClick={() => { addNode('exposition') }} onDragStart={(event) => onDragStart(event, 'exposition')} draggable>
            <span className="material-symbols-rounded">local_library</span>{isMobile ? undefined : 'Add Exposition'}
        </button>
        <button className="nodeTypePanel" onClick={() => { addNode('meta') }} onDragStart={(event) => onDragStart(event, 'meta')} draggable>
            <span className="material-symbols-rounded">select_all</span>{isMobile ? undefined : "Add Meta Node"}
        </button>
        <button className="nodeTypePanel" onClick={() => { addNode('signal') }} onDragStart={(event) => onDragStart(event, 'signal')} draggable>
            <span className="material-symbols-rounded">sensors</span>{isMobile ? undefined : "Add Signal"}
        </button>
        <button className="nodeTypePanel" onClick={() => { addNode('token') }} onDragStart={(event) => onDragStart(event, 'token')} draggable>
            <span className="material-symbols-rounded">{/* poker_chip */} {/* deployed_code */} key_vertical</span>{isMobile ? undefined : "Add Token"}
        </button>
    </Panel>
}