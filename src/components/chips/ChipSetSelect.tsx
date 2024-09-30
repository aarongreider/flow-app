import { useEffect, useState } from "react";
import { ChipChip } from "./ChipChip";
import { WithBarScrolling, WithLoading } from "./ChipSelectWrappers";
import useStore from "../../store/store";
import { ChipSet } from "../../types";

interface ChipSetSelectProps {
    visible: boolean;
    setChildVisible: (visible: boolean) => void;
}

export function ChipSetSelect({ visible, setChildVisible }: ChipSetSelectProps) {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const setActiveChipSet = useStore((state) => state.setActiveChipSet);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        localStorage.setItem('chips', JSON.stringify(projectChipSets))

        if (projectChipSets) {
            setIsLoading(false)
        }
    }, [projectChipSets])
    return <>
        <WithBarScrolling visible={visible} overflow="hidden" drag="x">
            <WithLoading isLoading={isLoading}>
                {projectChipSets?.map((chipSet: ChipSet) => {
                    return <ChipChip key={chipSet.key} setKey={chipSet.key} draggable={false} onClick={() => { setActiveChipSet(chipSet); setChildVisible(true) }}></ChipChip>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}