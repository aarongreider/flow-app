import { Chip } from "../../types";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { ChipChip } from "./ChipChip";
import { WithBarScrolling, WithLoading } from "./ChipSelectWrappers";

interface ChipSelectProps {
    visible: boolean;
    draggable: boolean;
}

export function ChipSelect({ visible, draggable }: ChipSelectProps) {
    const activeChipSet = useStore((state) => state.activeChipSet);
    const renameChip = useStore((state) => state.renameChip);
    const [isDragNDropping, setIsDragNDropping] = useState<boolean>(false)
    const [drag, setDrag] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (activeChipSet) {
            setIsLoading(false)
        }
    }, [activeChipSet])

    useEffect(() => {
        setDrag(isDragNDropping ? undefined : 'x')
    }, [isDragNDropping])

    const handleAddChip = () => {

    }
    const handleOpenSettings = () => {
        renameChip('WxrgoglYdvt7kRYYn_Wl_', 'AAo2s9iS3hWj4vH94LzyS', 'getSlingshot')
        console.log('renaming chip!');
    }

    return <>
        <WithBarScrolling visible={visible} overflow={isDragNDropping ? 'visible' : 'hidden'} drag={drag} handleAddChip={handleAddChip} handleOpenSettings={handleOpenSettings}>
            <WithLoading isLoading={isLoading}>
                {activeChipSet?.chips.map((chip: Chip) => {
                    return <ChipChip key={`chip-${chip.key}`} chipKey={chip.key} setKey={activeChipSet.key} draggable={draggable} setIsDragNDropping={setIsDragNDropping}></ChipChip>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}