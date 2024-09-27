import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import { easeInOut } from 'framer-motion/dom';
import { nanoid } from 'nanoid';
import { useState } from 'react';


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

interface DroppableProps {
    Component?: React.FC;
}

function Droppable({ Component }: DroppableProps) {
  const {setNodeRef} = useDroppable({
    id: nanoid(),
    data: {
        accepts: ['type1'],
      },
  });
  
  return (
    <div ref={setNodeRef} style={{width: '50%', height: '25px', border: '1px solid gray', borderRadius: '10px'}}>
     {Component ? <Component></Component> : undefined}
    </div>
  );
}



export function DndContextComp() {
    const [droppedComp, setDroppedComp] = useState<React.FC| null>()
    const handleDragEnd = (e: DragEndEvent) => {
        const {active, over} = e;

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