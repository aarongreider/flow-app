import { motion } from 'framer-motion';
import { useDragBoundaries } from "../../nodeEditorUtils";
import { ReactNode, useEffect, useRef, useState } from "react";
import useStore from '../../store/store';

interface WithBarScrollingProps {
    visible: boolean;
    overflow: string;
    drag: any;
    children: ReactNode;
}

export const WithBarScrolling = ({ visible, overflow, drag, children }: WithBarScrollingProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const boundaries = useDragBoundaries(contentRef);

    return (
        <div className={`chipsDash ${visible ? 'open' : 'closed'}`} style={{ overflow: `${overflow}`, position: 'relative' }}>
            <motion.div className="chipsDash open inner" style={{ width: "min-content" }}
                ref={contentRef}
                drag={drag}
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {children}
            </motion.div>

            <div style={{
                width: '100px', display: "flex", flexDirection: "row", gap: '6px', position: 'absolute', right: 0, padding: '10px', zIndex: '101', justifyContent: 'flex-end',
                pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(32,32,32,0) 0%, rgba(32,32,32,0.32) 8%, rgba(32,32,32,1) 36%)'
            }}>
                <span className="material-symbols-outlined chip" style={{ pointerEvents: "fill" }}>add</span>
                <span className="material-symbols-outlined chip" style={{ pointerEvents: "fill" }}>settings</span>
            </div>
        </div>)
}



interface WithLoadingProps {
    isLoading: boolean;
    children: ReactNode;
}

export const WithLoading = ({ isLoading, children }: WithLoadingProps) => {
    return (
        <>
            {isLoading ?
                <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                : children}
        </>
    )
}