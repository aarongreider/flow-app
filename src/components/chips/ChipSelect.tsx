import { Chip, ChipSet } from "../../types";
import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import { useDragBoundaries } from "../../nodeEditorUtils";
import { ChipChip } from "./ChipChip";
import { motion } from 'framer-motion';

interface ChipSelectProps {
    visible: boolean;
    draggable: boolean;
}

export function ChipSelect({ visible, draggable }: ChipSelectProps) {
    const activeChipSet = useStore((state) => state.activeChipSet);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const boundaries = useDragBoundaries(contentRef)
    const [isDragNDropping, setIsDragNDropping] = useState<boolean>(false)


    return <>
        <div className={`chipsDash ${visible ? 'open' : 'closed'}`} style={{ overflow: `${isDragNDropping ? 'visible' : 'hidden'}` }}>
            <motion.div className="chipsDash open inner" style={{ width: "min-content" }}
                ref={contentRef}
                drag={isDragNDropping ? undefined : 'x'}
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {
                    activeChipSet ? activeChipSet.chips.map((chip: Chip) => {
                        return <ChipChip key={`chip-${chip.key}`} chipKey={chip.key} setKey={activeChipSet.key} draggable={draggable} setIsDragNDropping={setIsDragNDropping}></ChipChip>
                    }) : <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                }
            </motion.div>
        </div>
    </>
}