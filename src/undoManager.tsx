import { useCallback, useEffect, useRef, useState } from "react";
import useStore from "./store/store";
import { AppState } from "@auth0/auth0-react";
import { debounce } from "./nodeEditorUtils";

export function UndoManager() {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const activePath = useStore((state) => state.activePath);
    const appLoaded = useStore((state) => state.appLoaded);
    const register = useStore((state) => state.register);
    const projectChipSets = useStore((state) => state.projectChipSets);

    const setNodes = useStore((state) => state.setNodes);
    const setEdges = useStore((state) => state.setEdges);
    const setChips = useStore((state) => state.setChips);

    const setLastChange = useStore((state) => state.setLastChange);
    const debouncedHandleAppState = useCallback(debounce(() => handleAppStateChange(), 300), []);


    const [undoStack, setUndoStack] = useState<AppState[]>([])
    const numUndos = useRef(0);

    // make 10 backups whenever something changes

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.key == "z" && e.ctrlKey && e.shiftKey) || (e.key == "z" && e.metaKey && e.shiftKey)) {
                handleRedo()
            } else if ((e.key == "z" && e.ctrlKey) || (e.key == "z" && e.metaKey)) {
                handleUndo()
            }
        }

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, [])

    useEffect(() => {
        if (appLoaded) {
            setTimeout(() => {
                debouncedHandleAppState()
            }, 1000);

        } else {
            console.log("app not loaded yet!", appLoaded);
        }
    }, [projectChipSets, nodes, edges])

    useEffect(() => {
        console.log('undoStack has change: ', numUndos.current, undoStack.length, undoStack)
    }, [undoStack])


    const handleUndo = () => {
        numUndos.current += 1;
        console.log('handle undo undoStack ', numUndos.current, undoStack.length, undoStack)

        const lastEl = undoStack[undoStack.length - 1]
        if (undoStack[undoStack.length - 1]) {
            console.log("popped el", lastEl);
            setNodes(lastEl.nodes)
            setEdges(lastEl.edges)
            setChips(lastEl.chips)
            setUndoStack(prevArray => prevArray.slice(0, -1))
        } else {
            console.log("No item to undo!", lastEl);

        }


    }

    const handleRedo = () => {
        console.log('redo!!')
    }

    const handleAppStateChange = () => {
        console.log("nodes on change", nodes);

        const newUndo: AppState = { nodes: nodes, edges: edges, chips: projectChipSets }
        setUndoStack((prevStack) => {
            const stack = [...prevStack, newUndo]
            console.log("adding to the undoStack!", newUndo);
            return stack
        })
        setLastChange(new Date)

    }

    return <>

    </>
}