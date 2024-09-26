import { useEffect, useRef, useState } from "react";
import useStore from "../store";
import { motion } from 'framer-motion';
import { useDragBoundaries } from "../nodeEditorUtils";
import { useDraggable } from "@dnd-kit/core";

export type ChipSet = { key: string, name: string, chips: string[] }

function renameChipSet(chipSets: ChipSet[], key: string, newName: string): void {
    const chipSet = chipSets.find(chip => chip.key === key);
    if (chipSet) {
        chipSet.name = newName;
    } else {
        console.log(`ChipSet with key "${key}" not found.`);
    }
}

function getChipSetNames(chipSets: ChipSet[]): string[] {
    // cycle through all the keys in the global set of chipsets and return an array of names
    const names = chipSets.reduce((acc: string[], chipSet) => {
        acc.push(chipSet.name)
        return acc
    }, [])
    return names
}



interface ChipDashProps {
    visible: boolean;
}

export function ChipsDashboard({ visible }: ChipDashProps) {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const setActiveChipSet = useStore((state) => state.setActiveChipSet);
    const [childVisible, setChildVisible] = useState<boolean>(false)
    const contentRef = useRef<HTMLDivElement | null>(null);
    const boundaries = useDragBoundaries(contentRef)

    useEffect(() => {
        if (!visible) {
            setChildVisible(false)
        }
    }, [visible])


    return <>
        <ChipSelect visible={childVisible} draggable={true}></ChipSelect>


        <div className={`chipsDash ${visible ? 'open' : 'closed'}`}>
            <motion.div className="chipsDash open" style={{ width: "min-content", overflow: 'visible' }}
                ref={contentRef}
                drag="x"
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {
                    projectChipSets ? projectChipSets.map((chipSet, index) => {
                        return <Chip key={index} title={chipSet.name} draggable={false} onClick={() => { setActiveChipSet(chipSet); setChildVisible(true) }}></Chip>
                    }) : <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                }
            </motion.div>
        </div>
    </>
}
export default ChipsDashboard


interface ChipSelectProps {
    visible: boolean;
    draggable: boolean;
}

function ChipSelect({ visible, draggable }: ChipSelectProps) {
    const activeChipSet = useStore((state) => state.activeChipSet);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const boundaries = useDragBoundaries(contentRef)


    return <>
        <div className={`chipsDash ${visible ? 'open' : 'closed'}`}>
            <motion.div className="chipsDash open" style={{ width: "min-content", overflow: 'visible' }}
                ref={contentRef}
                drag="x"
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {
                    activeChipSet ? activeChipSet.chips.map((chip, index) => {
                        return <Chip key={index} title={chip} draggable={draggable}></Chip>
                    }) : <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                }
            </motion.div>
        </div>
    </>
}




interface ChipProps {
    title: string;
    draggable: boolean;
    onClick?: () => void;
}

export function Chip({ title, draggable, onClick }: ChipProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `chip-${title}`, // Give each chip a unique ID
    });

    // Apply styles when dragging (optional)
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: draggable ? 'grab' : 'default',
    };
    return (
        <div className="chip" onClick={onClick}
            style={style} // Draggable Styles
        >
            {draggable ? <span className="material-symbols-outlined"
                ref={setNodeRef}
                {...attributes} // Attributes for drag functionality
                {...(draggable && listeners)} // Apply listeners only if draggable
            >
                drag_indicator
            </span> : <span style={{ width: '10px' }}></span>}
            <p>{title}</p>
        </div>


    )
}