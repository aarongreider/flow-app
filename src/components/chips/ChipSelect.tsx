import { Chip, ChipSet } from "../../types";
import { ReactNode, useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import { useDragBoundaries } from "../../nodeEditorUtils";
import { ChipChip } from "./ChipChip";
import { motion } from 'framer-motion';

interface ChipSelectProps {
    visible: boolean;
    draggable: boolean;
    //array: boolean;
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
        <WithBarScrolling visible={visible} overflow={isDragNDropping ? 'visible' : 'hidden'} drag={drag}>
            <WithLoading isLoading={isLoading}>
                {activeChipSet?.chips.map((chip: Chip) => {
                    return <ChipChip key={`chip-${chip.key}`} chipKey={chip.key} setKey={activeChipSet.key} draggable={draggable} setIsDragNDropping={setIsDragNDropping}></ChipChip>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}

interface WithBarScrollingProps {
    visible: boolean;
    overflow: string;
    drag: any;
    children: ReactNode;
}

export const WithBarScrolling = ({ visible, overflow, drag, children }: WithBarScrollingProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const boundaries = useDragBoundaries(contentRef);

    return (
        <div className={`chipsDash ${visible ? 'open' : 'closed'}`} style={{ overflow: `${overflow}` }}>
            <motion.div className="chipsDash open inner" style={{ width: "min-content" }}
                ref={contentRef}
                drag={drag}
                dragConstraints={{ left: boundaries.left, right: boundaries.right }}
            >
                {children}
            </motion.div>
        </div>)
}



interface WithLoadingProps {
    isLoading: boolean;
    children: ReactNode;
}

export const WithLoading = ({ isLoading, children }: WithLoadingProps) => {
    return (
        <>
            {isLoading ?
                <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                : children}
        </>
    )
}