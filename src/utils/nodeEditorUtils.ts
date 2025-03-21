import DialogueNode from '../components/nodes/components/Nodes/DialogueNode';
import ResponseNode from '../components/nodes/components/Nodes/ResponseNode';
import ExpositionNode from '../components/nodes/components/Nodes/ExpositionNode';
import MetaNode from '../components/nodes/components/Nodes/MetaNode';
import SignalNode from '../components/nodes/components/Nodes/SignalNode';
import TextReceiverNode from '../components/nodes/components/TextReceiverNode';
import CustomEdge from '../components/nodes/components/EdgeButton';
import { ChipSet, XY } from "./types";
import { useEffect, useState } from 'react';
import useStore from '../store/store';
import { Node, Viewport } from 'reactflow';


/* GENERIC SETTERS AND GETTERS */
export function getChipSetNames(chipSets: ChipSet[]): string[] {
    // cycle through all the keys in the global set of chipsets and return an array of names
    const names = chipSets.reduce((acc: string[], chipSet) => {
        acc.push(chipSet.name)
        return acc
    }, [])
    return names
}

export function getChipName(chipSets: ChipSet[], setKey: string, chipKey: string,) {
    const chipSet: ChipSet | undefined = chipSets.find(chipSet => chipSet.key === setKey);
    const chip = chipSet ? chipSet.chips.find(chip => chip.key === chipKey) : undefined
    return chip?.name ?? undefined
}

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
    /* FRAMER MOTION */
    const activeChipSet = useStore((state) => state.activeChipSet);
    const [boundaries, setBoundaries] = useState<{ left: number; right: number }>({
        left: 0,
        right: 0,
    });

    const updateBoundaries = () => {
        if (contentRef.current) {
            // Update boundaries based on viewport width
            const contentWidth = contentRef.current.offsetWidth;
            const viewportWidth = window.innerWidth - 100;
            setBoundaries({ left: contentWidth > viewportWidth ? -(contentWidth - viewportWidth) : 0, right: 0 });

        }
    }

    /* useEffect(() => {
        console.log("updating boundaries", boundaries);

    }, [boundaries]) */


    useEffect(() => {
        //call when setting active path
        setTimeout(updateBoundaries, 200)
    }, [activeChipSet])


    useEffect(() => {
        setTimeout(updateBoundaries, 1000)  // Initial call

        // Add resize listener to update boundaries when the window size changes
        window.addEventListener('resize', updateBoundaries);

        return () => {
            window.removeEventListener('resize', updateBoundaries); // Clean up listener
        };
    }, [contentRef]);

    return boundaries
}


/* OTHER UTILITY FUNCTIONS */
export const debounce = (callback: CallableFunction, wait: number) => {
    let timeoutId: any = null;
    return (...args: any) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

export const getViewportCenter = (viewport: Viewport): XY => {
    const { x, y, zoom } = viewport
    const width = window.innerWidth;
    const height = window.innerHeight;
    const center = {
        x: ((width / 2) - x) / (zoom),
        y: ((height / 2) - y) / (zoom),
    };
    return center
}

export const centerBoundingBox = (viewport: Viewport, items: XY[]): XY => {
    // use bounding box centering 

    /**
     * subtract the lowest x value from all the x's,
     * subtract the lowest y from all the y's, 
     * get the center point of the bounding box
     * add the center point to half the total height of the bounding rectangle 
    */

    const vpCenter = getViewportCenter(viewport)

    const min: XY = {
        x: Math.min(...items.map(item => item.x)),
        y: Math.min(...items.map(item => item.y))
    }

    const max: XY = {
        x: Math.max(...items.map(item => item.x)),
        y: Math.max(...items.map(item => item.y))
    }

    // Compute bounding box center
    const bboxCenter: XY = {
        x: (min.x + max.x) / 2,
        y: (min.y + max.y) / 2
    };

    // Adjust bounding box center to be centered relative to the viewport
    return {
        x: vpCenter.x - bboxCenter.x,
        y: vpCenter.y - bboxCenter.y
    };
}

export const centerItemsInViewport = (viewport: Viewport, nodes: Node[]): Node[] => {
    if (nodes.length === 0) return [];

    const vpCenter = getViewportCenter(viewport);
    console.log("Viewport center:", viewport, vpCenter);


    // Find bounding box min (upper-left corner)
    const min: XY = {
        x: Math.min(...nodes.map(node => node.position.x)),
        y: Math.min(...nodes.map(node => node.position.y))
    };
    const max: XY = {
        x: Math.max(...nodes.map(item => item.position.x)),
        y: Math.max(...nodes.map(item => item.position.y))
    }

    // Compute bounding box center
    const bboxCenter: XY = {
        x: (min.x + max.x) / 2,
        y: (min.y + max.y) / 2
    };

    const finalNodes = nodes.map(node => ({
        ...node,
        position: {
            x: node.position.x - bboxCenter.x + vpCenter.x,
            y: node.position.y - bboxCenter.y + vpCenter.y,
        }
    }));

    return finalNodes
};
