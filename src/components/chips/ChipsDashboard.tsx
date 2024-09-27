import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import { motion } from 'framer-motion';
import { useDragBoundaries } from "../../nodeEditorUtils";

import { ChipChip } from "./ChipChip";
import { ChipSelect } from "./ChipSelect";


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
            <motion.div className="chipsDash open inner" style={{ width: "min-content", overflow: 'visible' }}
                ref={contentRef}
                drag="x"
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {
                    projectChipSets ? projectChipSets.map((chipSet) => {
                        return <ChipChip key={chipSet.key} setKey={chipSet.key} draggable={false} onClick={() => { setActiveChipSet(chipSet); setChildVisible(true) }}></ChipChip>
                    }) : <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                }
            </motion.div>
        </div>
    </>
}
export default ChipsDashboard