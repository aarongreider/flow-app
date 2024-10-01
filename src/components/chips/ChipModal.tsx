import { useState } from "react";
import useStore from "../../store/store";
import { Chip, ChipSet } from "../../types";
import { AsSelectableLi, AsSelectableUl, WithPopUp, WithUlModal } from "../genericWrappers";

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
                    return <ChipSetLineItem chipSet={chipSet}></ChipSetLineItem>
                }) : <p>{"No Chipsets :)"}</p>}
            </WithUlModal>
        </WithPopUp>
    </>
}

interface ChipSetLineItemProps {
    chipSet: ChipSet
}
const ChipSetLineItem = ({ chipSet }: ChipSetLineItemProps) => {
    const [chipSetName, setChipSetName] = useState<string>(chipSet.name)
    const handleRenameChipSet = (newName: string) => {

    }
    const handleAddChip = () => {

    }
    return <>
        <AsSelectableUl title={chipSetName} setTitle={setChipSetName} handleNewTitle={handleRenameChipSet} handleAddItem={handleAddChip} >
            {/* map chips in chipset */}
            {chipSet.chips.map((chip, index) => {
                return <ChipLineItem chip={chip} chipSetKey={chipSet.key}></ChipLineItem>
            })}
        </AsSelectableUl>
    </>
}

interface ChipLineItemProps {
    chip: Chip
    chipSetKey: string
}
const ChipLineItem = ({ chip, chipSetKey }: ChipLineItemProps) => {
    const [chipName, setChipName] = useState<string>(chip.name)
    const handleRenameChip = (newName: string) => {

    }
    const handleAddChip = () => {
        // prompt for user specific chip name
    }
    return <>
        <AsSelectableLi key={chip.key} title={chipName} setTitle={setChipName} handleNewTitle={handleRenameChip} handleClickItem={handleAddChip}>
            {/* chip name */}
            {chip.name}
        </AsSelectableLi>
    </>
}