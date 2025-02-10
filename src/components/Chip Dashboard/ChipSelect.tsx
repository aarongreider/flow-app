import { Chip } from "../../types";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { ChipItem } from "./Chip";
import { WithBarScrolling } from "./WithBarScrolling";
import { WithLoading } from "./WithLoading";

interface ChipSelectProps {
    visible: boolean;
    draggable: boolean;
}

export function ChipSelect({ visible, draggable }: ChipSelectProps) {
    const activeChipSet = useStore((state) => state.activeChipSet);
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

    return <>
        <WithBarScrolling
            visible={visible}
            overflow={isDragNDropping ? 'visible' : 'hidden'}
            drag={drag}
            controls={[true, false]}
        >
            <WithLoading isLoading={isLoading}>
                {activeChipSet?.chips.map((chip: Chip) => {
                    return <ChipItem key={`chip-${chip.key}`} chipKey={chip.key} setKey={activeChipSet.key} draggable={draggable} setIsDragNDropping={setIsDragNDropping}></ChipItem>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}