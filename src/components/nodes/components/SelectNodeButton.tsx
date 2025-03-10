import { DndContext, DraggableAttributes, useDraggable } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { transform } from "framer-motion";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState } from "react"
import useStore from "../../../store/store";
import { XY } from "../../../utils/types";
import { useReactFlow } from "reactflow";

interface ButtonProps {
    id: string,
    selected: boolean,
    listeners?: SyntheticListenerMap | undefined,
    attributes?: DraggableAttributes,
    onDuplicate: (/* event: MouseEvent */) => void,
}

function SelectNodeButton({ id, selected, /* listeners, attributes, */ onDuplicate }: ButtonProps) {
    const [isLongPress, setIsLongPress] = useState<boolean>(false)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const isDraggingRef = useRef<boolean>(false)
    const clientXY = useStore((state) => state.clientXY);
    const toggleSelectedNode = useStore((state) => state.toggleSelectedNode);

    const [ghostPos, setGhostPos] = useState<XY>({ x: 0, y: 0 })
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reactFlowInstance = useReactFlow();
    const selectButtonRef = useRef<HTMLButtonElement>(null)

    const [initialDragPos, setInitialDragPos] = useState<XY>({ x: 0, y: 0 })

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    useEffect(() => {
        if (isDraggingRef.current) {
            /* setflowXY(reactFlowInstance.screenToFlowPosition({
                x: clientXY.x,
                y: clientXY.y,
            })) */
            setGhostPos({ x: clientXY.x - initialDragPos.x, y: clientXY.y - initialDragPos.y })
        }
    }, [clientXY])


    const handleMouseDown = () => {
        timerRef.current = setTimeout(() => {
            setIsLongPress(true)
        }, 1000);
    };

    const handleMouseUp = () => {

        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        if (isDraggingRef.current) {
            onDuplicate();
        }
        setIsLongPress(false)
        setIsDragging(false)
        isDraggingRef.current = false
    }

    const handleMouseMove = () => {
        if (isLongPress) {
            console.log("Dragging after long press!");
            setIsDragging(true)
            isDraggingRef.current = true
            setIsLongPress(false)
            setInitialDragPos(clientXY)
        }
    };

    const onSelect = () => {
        toggleSelectedNode(id)
    }



    return (
        <>
            {isDragging && <div className="dragGhost" style={{ transform: `translate3d(${ghostPos.x}px, ${ghostPos.y}px, 0)` }} />}
            <button className="nodeButton nodrag nopan selectNodeButton" ref={selectButtonRef}
                style={{
                    backgroundColor: `${selected ? '#87BC83' : 'white'}`,
                    outline: `${isLongPress ? '2px solid' : ''}`,
                }}
                onClick={onSelect}
                onMouseDown={handleMouseDown}
                /* onMouseUp={handleMouseUp} */
                onMouseMove={handleMouseMove}
            >
                <div style={{ width: '5px', height: "5px", borderRadius: '50px', backgroundColor: `${selected ? 'white' : 'lightgrey'}` }}></div>
            </button>
            <div className="dragHandle"></div>
        </>)
}

export default SelectNodeButton