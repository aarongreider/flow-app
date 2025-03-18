import { DragOverlay, /* useDraggable */ } from "@dnd-kit/core"
import { ReactNode } from "react"

interface dupeProps {
    children: ReactNode
}
export function Duplicatable({ children }: dupeProps) {

    /* DRAGGABLE */
    /* const { attributes, listeners, setNodeRef: dragRef, transform, isDragging } = useDraggable({
        id: 5,
        data: {
            type: 'type1',
        },
    }); */

    /* const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        padding: '10px',
    }; */


    return <>
        {children}
        <DragOverlay>
            {children}
        </DragOverlay>
    </>
}