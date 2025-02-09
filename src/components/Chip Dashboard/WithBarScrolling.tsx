import { motion } from 'framer-motion';
import { useDragBoundaries } from "../../nodeEditorUtils";
import { ReactNode, useRef } from "react";

interface WithBarScrollingProps {
    visible: boolean;
    overflow: string;
    drag: any;
    children: ReactNode;
    controls: boolean;
    handleAddChip?: () => void;
    handleOpenSettings?: () => void;
}

export const WithBarScrolling = ({ visible, overflow, drag, children, controls, handleAddChip, handleOpenSettings }: WithBarScrollingProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const boundaries = useDragBoundaries(contentRef);

    return (
        <div className={`chipsDash ${visible ? 'open' : 'closed'}`}
            style={{ overflow: `${overflow}`, position: 'relative' }}
        >
            <motion.div className="chipsDash open inner" style={{ width: "min-content" }}
                ref={contentRef}
                drag={drag}
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {children}
            </motion.div>

            {controls ? <div style={{
                width: '100px', display: "flex", flexDirection: "row", gap: '6px', position: 'absolute', right: 0, padding: '10px', zIndex: '101', justifyContent: 'flex-end',
                pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(32,32,32,0) 0%, rgba(32,32,32,0.32) 8%, rgba(32,32,32,1) 36%)'
            }}>
                <span className="material-symbols-outlined chip" style={{ pointerEvents: "fill" }} onClick={handleAddChip}>add</span>
                <span className="material-symbols-outlined chip" style={{ pointerEvents: "fill" }} onClick={handleOpenSettings}>settings</span>
            </div> : undefined}
        </div>)
}