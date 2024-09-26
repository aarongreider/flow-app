import DialogueNode from './components/DialogueNode';
import ResponseNode from './components/ResponseNode';
import ExpositionNode from './components/ExpositionNode';
import MetaNode from './components/MetaNode';
import SignalNode from './components/SignalNode';
import TextReceiverNode from './components/TextReceiverNode';
import CustomEdge from './components/EdgeButton';
import TokenNode from './components/TokenNode';
import { useEffect, useState } from 'react';

/* REACTFLOW BOILERPLATE */
export const selector = (state: any) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export const nodeTypes = {
    dialogue: DialogueNode,
    textReceiver: TextReceiverNode,
    response: ResponseNode,
    exposition: ExpositionNode,
    meta: MetaNode,
    signal: SignalNode,
    token: TokenNode,
};
export const edgeTypes = { customEdge: CustomEdge };

/* CUSTOM HOOKS */
export const useWindowResizer = (setIsMobile: any) => {
    useEffect(() => { /* WINDOW RESIZER */
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
}

export const useActivePathEffect = (projectKey: string | undefined, pageKey: string | undefined, setActivePath: any) => {
    useEffect(() => { /* SET ACTIVE PATH */
        console.log("url params:", projectKey, pageKey);

        if (projectKey && pageKey) {
            setActivePath({ projectKey, pageKey })
        }
    }, [])
}

export const useDragBoundaries = (contentRef: React.RefObject<HTMLDivElement>) => {
     //#region FRAMER MOTION
     const [boundaries, setBoundaries] = useState<{ left: number; right: number }>({
         left: 0,
         right: 0,
     });
 
     const updateBoundaries = () => {
         if (contentRef.current) {
             // Update boundaries based on viewport width
             const contentWidth = contentRef.current.offsetWidth;
             const viewportWidth = window.innerWidth;
             setBoundaries({ left: contentWidth > viewportWidth ? -(contentWidth - viewportWidth + 50) : 0, right: 0 });
         }
     }
 
     useEffect(() => {
         setTimeout(updateBoundaries, 1000)  // Initial call
 
         // Add resize listener to update boundaries when the window size changes
         window.addEventListener('resize', updateBoundaries);
 
         return () => {
             window.removeEventListener('resize', updateBoundaries); // Clean up listener
         };
     }, [contentRef]);
     
     return boundaries
     //#endregion
}