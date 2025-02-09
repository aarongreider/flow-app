import { useDraggable } from '@dnd-kit/core';
//import { easeInOut } from 'framer-motion/dom';
import { nanoid } from 'nanoid';


export function Draggable() {
    const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
        id: nanoid(),
        data: {
            type: 'type1',
        },
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        border: '1px solid black',
        padding: '10px',
        backgroundColor: '#f0f0f0',
    };

    return (
        <div
            className="draggable"
            ref={dragRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            Drag Me
        </div>
    );
}