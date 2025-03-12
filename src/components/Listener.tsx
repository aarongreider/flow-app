import { useEffect } from "react";
import useStore from "../store/store";
import { nanoid } from "nanoid";
import { useViewport } from "reactflow";


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

    useEffect(() => {
        console.log(viewport);
    }, [viewport])



    const setXY = (e: MouseEvent) => {
        setClientXY({ x: e.clientX, y: e.clientY })
    }

    const handleKeydown = (e: KeyboardEvent) => {
        if ((e.key == "c" && e.ctrlKey) || (e.key == "c" && e.metaKey)) {
            // COPY
            copyToClipboard(JSON.stringify(selectedNodes))
        } else if ((e.key == "v" && e.ctrlKey) || (e.key == "v" && e.metaKey)) {
            // PASTE
            pasteClipboard()
        } else if ((e.key == "a" && e.ctrlKey && e.shiftKey) || (e.key == "a" && e.metaKey && e.shiftKey)) {
            // DESELECT ALL
            e.preventDefault()
            selectedNodes.forEach(id => {
                toggleSelectedNode(id)
            });
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
                    const IDs: string[] = JSON.parse(response)
                    console.log("Pasting:", IDs)

                    IDs.forEach(id => {
                        const node = getNode(id)
                        console.log(node);
                        if (node) {
                            const { position, data, type } = node
                            setNodes([...nodes, { id: nanoid(), position, data, type, selected: true }])
                        }
                    });
                })

        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return <></>
}