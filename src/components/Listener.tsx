import { useEffect } from "react";
import useStore from "../store/store";
import { Node, useReactFlow, useViewport, Viewport } from "reactflow";
import { centerItemsInViewport } from "../utils/nodeEditorUtils";


export default function Listener() {
    // the listener listens

    // mouse movements
    // copy and paste

    const appendNodes = useStore((state) => state.appendNodes);
    const deselectAllNodes = useStore((state) => state.deselectAllNodes);
    const getSelectedNodes = useStore((state) => state.getSelectedNodes);
    const setClientXY = useStore((state) => state.setClientXY);
    const setViewport = useStore((state) => state.setViewport);
    const getViewport = useStore((state) => state.getViewport);

    const useVp: Viewport = useViewport()
    const RF = useReactFlow()
    //const viewportRef = useRef(useViewport());

    useEffect(() => {
        window.addEventListener('mousemove', setXY)
        return () => window.removeEventListener('mousemove', setXY)
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown)
    }, [])

    useEffect(() => {
        setViewport(useVp)
    }, [useVp])



    const setXY = (e: MouseEvent) => {
        setClientXY({ x: e.clientX, y: e.clientY })
    }

    const handleKeydown = (e: KeyboardEvent) => {
        if ((e.key == "c" && e.ctrlKey) || (e.key == "c" && e.metaKey)) {
            // COPY
            const newNodes: Node[] = []
            getSelectedNodes().forEach(node => { // for each node that we're copying
                console.log(`copy node before`, node);
                if (node) {
                    const newNode: Node = { ...node }
                    newNodes.push(newNode)
                    console.log(`copy node after`, newNode);
                }
            });
            copyToClipboard(JSON.stringify(newNodes))
        } else if ((e.key == "v" && e.ctrlKey) || (e.key == "v" && e.metaKey)) {
            // PASTE
            pasteClipboard()
        } else if ((e.key == "a" && e.ctrlKey && e.shiftKey) || (e.key == "a" && e.metaKey && e.shiftKey)) {
            // DESELECT ALL
            e.preventDefault()
            deselectAllNodes()
        }
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard
                .writeText(text)
                .then(() => console.log("Copied to clipboard:", text))

        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };
    const pasteClipboard = async () => {
        try {
            await navigator.clipboard
                .readText()
                .then((response) => {
                    const clipboard: Node[] = JSON.parse(response)
                    console.log("Pasting:", clipboard)
                    deselectAllNodes()
                    const offsetNodes = centerItemsInViewport(getViewport(), clipboard)
                    appendNodes([...offsetNodes])
                    RF.fitView({ nodes: offsetNodes, duration: 500 })
                })

        } catch (err) {
            console.error("Failed to paste:", err);
        }
    }

    return <></>
}