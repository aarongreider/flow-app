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
    const renameChipSet = useStore((state) => state.renameChipSet);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        localStorage.setItem('chips', JSON.stringify(projectChipSets))

        if (projectChipSets) {
            setIsLoading(false)
        }
    }, [projectChipSets])

    const handleAddChip = () => {
        
    }
    const handleOpenSettings = () => {
        renameChipSet('WxrgoglYdvt7kRYYn_Wl_', 'events')
        console.log('renaming chipset!');
    }
    return <>
        <WithBarScrolling visible={visible} overflow="hidden" drag="x" handleAddChip={handleAddChip} handleOpenSettings={handleOpenSettings}>
            <WithLoading isLoading={isLoading}>
                {projectChipSets?.map((chipSet: ChipSet) => {
                    return <ChipChip key={chipSet.key} setKey={chipSet.key} draggable={false} onClick={() => { setActiveChipSet(chipSet); setChildVisible(true) }}></ChipChip>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}