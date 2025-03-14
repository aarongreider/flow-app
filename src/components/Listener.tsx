import { useEffect } from "react";
import useStore from "../store/store";
import { nanoid } from "nanoid";
import { Node, useViewport } from "reactflow";


export default function Listener() {
    // the listener listens

    // mouse movements
    // copy and paste
    const nodes = useStore((state) => state.nodes);
    const getNode = useStore((state) => state.getNode);
    const setNodes = useStore((state) => state.setNodes);
    const selectedNodes = useStore((state) => state.selectedNodes);
    const toggleSelectedNode = useStore((state) => state.toggleSelectedNode);
    const setClientXY = useStore((state) => state.setClientXY);

    const viewport = useViewport()


    useEffect(() => {
        window.addEventListener('mousemove', setXY)
        return () => window.removeEventListener('mousemove', setXY)
    }, [])

    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown)
    }, [selectedNodes])

    /* useEffect(() => {
        console.log(viewport);
    }, [viewport]) */



    const setXY = (e: MouseEvent) => {
        setClientXY({ x: e.clientX, y: e.clientY })
    }

    const handleKeydown = (e: KeyboardEvent) => {
        if ((e.key == "c" && e.ctrlKey) || (e.key == "c" && e.metaKey)) {
            // COPY
            const newNodes: Node[] = []
            selectedNodes.forEach(id => { // for each node that we're copying
                const node = getNode(id)
                console.log(`copy node before`, node);
                if (node) {
                    const newNode: Node = { ...node, id: nanoid(), selected: true }
                    newNodes.push(newNode)
                    console.log(`copy node after`, newNode);
                }
            });
            copyToClipboard(JSON.stringify(newNodes))
            //copyToClipboard(JSON.stringify(selectedNodes))
        } else if ((e.key == "v" && e.ctrlKey) || (e.key == "v" && e.metaKey)) {
            // PASTE
            pasteClipboard()
        } else if ((e.key == "a" && e.ctrlKey && e.shiftKey) || (e.key == "a" && e.metaKey && e.shiftKey)) {
            // DESELECT ALL
            e.preventDefault()
            deselectAll()
        }

    }

    const deselectAll = () => {
        selectedNodes.forEach(id => {
            toggleSelectedNode(id)
        });
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
                    //const IDs: string[] = JSON.parse(response)
                    const newNodes: Node[] = JSON.parse(response)
                    console.log("Pasting:", newNodes)
                    deselectAll()

                    newNodes.forEach(node => { // for each node that we're pasting
                        if (node) {
                            //const { position, data, type } = node
                            //TODO: get the center and apply it to each node
                            const newNode: Node = { ...node, position: { x: Math.random() * 100, y: Math.random() * 100 } }
                            newNodes.push(newNode)
                            console.log(`node after`, newNode);
                        }
                    });
                    //TODO: write an add nodes in the react flow slice to avoid setting from a stale nodes reference
                    setNodes([...nodes, ...newNodes])
                })

        } catch (err) {
            console.error("Failed to paste:", err);
        }
    };

    return <></>
}