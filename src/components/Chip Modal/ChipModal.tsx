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

    const handleAddChipSet = () => {

    }

    return <>
        <WithPopUp visible={visible} toggleVisible={toggleVisible}>
            <WithUlModal header="Chips" onClickAddButton={handleAddChipSet} >
                {/* map all chipsets */}
                {projectChipSets ? projectChipSets.map((chipSet, index) => {
                    return <ChipSetLineItem chipSet={chipSet} key={index}></ChipSetLineItem>
                }) : <p>{"No Chipsets :)"}</p>}
            </WithUlModal>
        </WithPopUp>
    </>
}