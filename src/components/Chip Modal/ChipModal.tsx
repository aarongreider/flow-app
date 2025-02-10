import useStore from "../../store/store";
import { WithPopUp } from "../Layout Wrappers/PopUp";
import { WithUlModal } from "../Layout Wrappers/ULModal";

import ChipSetLineItem from "./ChipSetLineItem";

interface ChipModalProps {
    visible: boolean
    toggleVisible: () => void
}

export const ChipModal = ({ visible, toggleVisible }: ChipModalProps) => {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const addChipSet = useStore((state) => state.addChipSet);
    const handleAddChipSet = () => {
        const response = prompt('New Chip Set Name:');
        if (response) {
            addChipSet(response)
        }
    }

    return <>
        <WithPopUp visible={visible} toggleVisible={toggleVisible}>
            <WithUlModal header="Chips" onClickAddButton={handleAddChipSet} >
                {/* map all chipsets */}
                {projectChipSets && projectChipSets?.length > 0 ? projectChipSets.map((chipSet, index) => {
                    return <ChipSetLineItem chipSet={chipSet} key={index}></ChipSetLineItem>
                }) : <p>{"No Chipsets :)"}</p>}
            </WithUlModal>
        </WithPopUp>
    </>
}