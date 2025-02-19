import { Panel } from 'reactflow';
import { UndoManager } from '../undoManager';

interface PanelProps {
    togglePageList: () => void;
    toggleChips: () => void;
    doThing: () => void;
}
export function ActionsPanel({ togglePageList, toggleChips, /* doThing */ }: PanelProps) {
    return <Panel position="bottom-right" style={{ display: "flex", gap: '8px', flexDirection: 'column', bottom: '10px' }}>
        <UndoManager />
        <button onClick={toggleChips} style={{ zIndex: 101 }}>
            <span className="material-symbols-outlined">public</span>
        </button>
        <button onClick={togglePageList} style={{ zIndex: 101 }}>
            <span className="material-symbols-outlined">description</span>
        </button>
        {/* <button onClick={doThing} style={{ zIndex: 101 }}>
            <span className="material-symbols-outlined">token</span>
        </button> */}
    </Panel>
}