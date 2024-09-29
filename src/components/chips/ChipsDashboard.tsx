import { useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import { motion } from 'framer-motion';
import { useDragBoundaries } from "../../nodeEditorUtils";

import { ChipChip } from "./ChipChip";
import { ChipSelect, WithBarScrolling, WithLoading } from "./ChipSelect";
import { ChipSet } from "../../types";


interface ChipDashProps {
    visible: boolean;
}

export function ChipsDashboard({ visible }: ChipDashProps) {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const setActiveChipSet = useStore((state) => state.setActiveChipSet);
    const [childVisible, setChildVisible] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!visible) {
            setChildVisible(false)
        }
    }, [visible])

    useEffect(() => {
        localStorage.setItem('chips', JSON.stringify(projectChipSets))

        if (projectChipSets) {
            setIsLoading(false)
        }
    }, [projectChipSets])


    return <>
        <ChipSelect visible={childVisible} draggable={true}></ChipSelect>

        <WithBarScrolling visible={visible} overflow="hidden" drag="x" >
            <WithLoading isLoading={isLoading}>
                {projectChipSets?.map((chipSet: ChipSet) => {
                    return <ChipChip key={chipSet.key} setKey={chipSet.key} draggable={false} onClick={() => { setActiveChipSet(chipSet); setChildVisible(true) }}></ChipChip>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}
export default ChipsDashboard


