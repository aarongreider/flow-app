import { useCallback, useEffect, useRef } from "react";
import useStore from "./store/store";
import { AppState } from "@auth0/auth0-react";
import { debounce } from "./nodeEditorUtils";

export function UndoManager() {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const appLoaded = useStore((state) => state.appLoaded);
    const projectChipSets = useStore((state) => state.projectChipSets);

    const setNodes = useStore((state) => state.setNodes);
    const setEdges = useStore((state) => state.setEdges);
    const setChips = useStore((state) => state.setChips);

    //const setLastChange = useStore((state) => state.setLastChange);
    const debouncedAddToStack = useCallback(debounce(() => handleAddToStack(), 200), []);

    /* REFS */
    const nodesRef = useRef(nodes);
    const edgesRef = useRef(edges);
    const chipsRef = useRef(projectChipSets);

    //const [undoStack, setUndoStack] = useState<AppState[]>([])
    const undoStack = useRef<AppState[]>([])
    const redoStack = useRef<AppState[]>([])
    const skipNextStash = useRef<boolean>(false)
    const numUndos = useRef(0);



    // make 10 backups whenever something changes

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.key == "z" && e.ctrlKey && e.shiftKey) || (e.key == "z" && e.metaKey && e.shiftKey)) {
                e.preventDefault()
                handleRedo()
            } else if ((e.key == "z" && e.ctrlKey) || (e.key == "z" && e.metaKey)) {
                e.preventDefault()
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
            nodesRef.current = nodes;
            edgesRef.current = edges;
            chipsRef.current = projectChipSets;
            setTimeout(() => {
                if (!skipNextStash.current) {
                    debouncedAddToStack()
                } else {
                    console.log("skipping this undo stash");
                    skipNextStash.current = false
                }
            }, 200);

        } /* else {
            console.log("app not loaded yet!", appLoaded);
        } */
    }, [projectChipSets, nodes, edges, appLoaded])

    const handleUndo = () => {
        // pop item off the top, then add it to redo
        // set state based off new top item.
        numUndos.current += 1;

        // if the length is 1, then don't pop anything off, or else we won't ever return to the initial state
        if (undoStack.current.length > 1) {
            // pop it off the top
            const popped = undoStack.current.pop()
            popped && redoStack.current.push(popped)
        }

        // lastEl is the item to set the state to
        const lastEl = undoStack.current[undoStack.current.length - 1]

        if (lastEl) {
            skipNextStash.current = true
            setNodes(lastEl.nodes.map((node: any) => (
                { ...node, data: { ...node.data } }
            )),)
            setEdges(lastEl.edges)
            setChips(lastEl.chips)
        } else {
            console.log("No item to undo!", lastEl);
        }

        //console.log('undoStack after undo ', numUndos.current, undoStack.current.length, undoStack)
    }

    const handleRedo = () => {
        console.log('redo!!')
         // if the length is 1, then don't pop anything off, or else we won't ever return to the initial state
         if (undoStack.current.length > 1) {
            // pop it off the top
            const popped = redoStack.current.pop()
            popped && undoStack.current.push(popped)
        }

        // lastEl is the item to set the state to
        const lastEl = undoStack.current[undoStack.current.length - 1]

        if (lastEl) {
            skipNextStash.current = true
            setNodes(lastEl.nodes.map((node: any) => (
                { ...node, data: { ...node.data } }
            )),)
            setEdges(lastEl.edges)
            setChips(lastEl.chips)
        } else {
            console.log("No item to redo!", lastEl);
        }
    }

    const handleAddToStack = useCallback(() => {
        const newUndo: AppState = {
            nodes: nodesRef.current.map(node => (
                { ...node, data: { ...node.data } }
            )), 
            edges: edgesRef.current, 
            chips: chipsRef.current
        }
        undoStack.current.length >= 50 && undoStack.current.shift() // shift array to the left
        undoStack.current.push(newUndo)
        redoStack.current = []
        //console.log("adding to the undoStack!", undoStack.current.length, undoStack.current);
    }, [nodes, edges, projectChipSets])

    return <>
        <button onClick={handleUndo} style={{ zIndex: 101, opacity: `${undoStack.current.length < 2 ? '.5' : '1'}` }}>
            <span className="material-symbols-outlined">undo</span>
        </button>
        <button onClick={handleUndo} style={{ zIndex: 101, opacity: `${redoStack.current.length < 1 ? '.5' : '1'}` }}>
            <span className="material-symbols-outlined">redo</span>
        </button>
    </>
}