import { useDroppable } from "@dnd-kit/core";
import { nanoid } from "nanoid";

interface DroppableProps {
    Component?: React.FC;
}

export default function Droppable({ Component }: DroppableProps) {
    const { setNodeRef } = useDroppable({
        id: nanoid(),
        data: {
            accepts: ['type1'],
        },
    });

    return (
        <div ref={setNodeRef} style={{ width: '50%', height: '25px', border: '1px solid gray', borderRadius: '10px' }}>
            {Component ? <Component></Component> : undefined}
        </div>
    );
}
