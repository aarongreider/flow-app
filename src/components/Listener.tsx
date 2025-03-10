import { useEffect } from "react";
import useStore from "../store/store";


export default function Listener() {
    // the listener listens

    // mouse movements
    // copy and paste
    const selectedNodes = useStore((state) => state.selectedNodes);

    const setClientXY = useStore((state) => state.setClientXY);
    useEffect(() => {
        window.addEventListener('mousemove', setXY)
        window.addEventListener("keydown", handleKeydown);


        return () => {
            window.removeEventListener('mousemove', setXY)
            window.removeEventListener("keydown", handleKeydown);
        }
    }, [])

    const setXY = (e: MouseEvent) => {
        setClientXY({ x: e.clientX, y: e.clientY })
    }
    //TODO
    const handleKeydown = (e: KeyboardEvent) => {
        if ((e.key == "c" && e.ctrlKey) || (e.key == "c" && e.metaKey)) {

            // copyToClipboard(selectedNodes)
        }
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log("Copied to clipboard:", text);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return <></>
}