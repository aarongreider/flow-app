
import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { getChipName } from "../../nodeEditorUtils";


interface ChipProps {
    chipKey?: string;
    altID?: string
    setKey: string
    draggable: boolean;
    onClick?: () => void;
    setIsDragNDropping?: (bool: boolean) => void;
}

export function ChipChip({ chipKey, altID, setKey, draggable, onClick, setIsDragNDropping }: ChipProps) {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const [chipName, setChipName] = useState<string>()
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `chip-${altID ? altID : chipKey}`, // Give each chip a unique ID
        data: {
            type: 'chip',
            chipKey, setKey
        }
    });

    // Apply styles when dragging (optional)
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 1 : 1,
        cursor: draggable ? 'grab' : 'default',
    };

    useEffect(() => { // Set Chip Name
        if (projectChipSets) {
            if (chipKey) {
                setChipName(getChipName(projectChipSets, setKey, chipKey))
            } else {
                setChipName(projectChipSets.find(chipSet => chipSet.key === setKey)?.name)
            }
        }
    }, [projectChipSets, chipKey])

    useEffect(() => { // Draggability Bubble Up
        setIsDragNDropping && setIsDragNDropping(isDragging)
        //console.log("IS DRAGGING", isDragging);
    }, [isDragging])


    return (
        <div className="chip" onClick={onClick}
            style={{ ...style, paddingRight: '14px' }} // Draggable Styles
        >
            {draggable ? <span className="material-symbols-outlined nodrag"
                ref={setNodeRef}
                {...attributes} // Attributes for drag functionality
                {...(draggable && listeners)} // Apply listeners only if draggable
            >
                drag_indicator
            </span> : <span style={{ width: '10px' }}></span>}
            <p>{chipName}</p>
        </div>


    )
}