import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { Draggable } from "./Draggable";
import Droppable from "./Droppable";

export function DndContextComp() {
    const [droppedComp, setDroppedComp] = useState<React.FC | null>()
    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;

        if (over && over.data.current?.accepts.includes(active.data.current?.type)) {
            // do stuff
            console.log("OVER")
            setDroppedComp(Draggable)
        }
    }
    return <DndContext onDragEnd={handleDragEnd}>
        <Draggable></Draggable>
        <Droppable Component={droppedComp ?? undefined} ></Droppable>
    </DndContext>
}