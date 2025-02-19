import { useEffect, useState } from "react";
import { ChipItem } from "./Chip";
import { WithBarScrolling } from "./WithBarScrolling";
import useStore from "../../store/store";
import { ChipSet } from "../../types";
import { ChipModal } from "../Chip Modal/ChipModal";
import { WithLoading } from "./WithLoading";

interface ChipSetSelectProps {
    visible: boolean;
    setChildVisible: (visible: boolean) => void;
}

export function ChipSetSelect({ visible, setChildVisible }: ChipSetSelectProps) {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const setActiveChipSet = useStore((state) => state.setActiveChipSet);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    useEffect(() => {
        localStorage.setItem('chips', JSON.stringify(projectChipSets))

        if (projectChipSets) {
            setIsLoading(false)
        }
    }, [projectChipSets])

    const handleAddChip = () => {

    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return <>
        <ChipModal visible={modalVisible} toggleVisible={toggleModal}></ChipModal>
        <WithBarScrolling visible={visible}
            overflow="hidden" drag="x"
            handleAddChip={handleAddChip}
            handleOpenSettings={toggleModal}
            controls={[true, true]}
        >
            <WithLoading isLoading={isLoading}>
                {projectChipSets?.map((chipSet: ChipSet) => {
                    return <ChipItem key={chipSet.key} setKey={chipSet.key} draggable={false} onClick={() => { setActiveChipSet(chipSet); setChildVisible(true) }}></ChipItem>
                })}
            </WithLoading>
        </WithBarScrolling>
    </>
}