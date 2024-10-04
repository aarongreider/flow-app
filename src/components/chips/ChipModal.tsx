import { useCallback, useState } from "react";
import useStore from "../../store/store";
import { Chip, ChipSet } from "../../types";
import { AsSelectableLi, AsSelectableUl, WithPopUp, WithUlModal } from "../genericWrappers";
import { nanoid } from "nanoid";
import ChipsDashboard from "./ChipsDashboard";

interface ChipModalProps {
    visible: boolean
    toggleVisible: () => void
}

export const ChipModal = ({ visible, toggleVisible }: ChipModalProps) => {
    const projectChipSets = useStore((state) => state.projectChipSets);

    const handleAddChipSet = () => {

    }
    const handleRenameChipSet = () => {

    }

    return <>
        <WithPopUp visible={visible} toggleVisible={toggleVisible}>
            <WithUlModal header="Chips" onClickAddButton={handleAddChipSet} >
                {/* map all chipsets */}
                {projectChipSets ? projectChipSets.map((chipSet, index) => {
                    return <ChipSetLineItem key={chipSet.key} chipSet={chipSet}></ChipSetLineItem>
                }) : <p>{"No Chipsets :)"}</p>}
            </WithUlModal>
        </WithPopUp>
    </>
}


interface ChipSetLineItemProps {
    chipSet: ChipSet
}

const ChipSetLineItem = ({ chipSet }: ChipSetLineItemProps) => {
    // the project level line item
    const [chipSetName, setChipSetName] = useState<string>(chipSet.name)
    const renameChipSet = useStore((state) => state.renameChipSet);
    const addChip = useStore((state) => state.addChip);

    const handleRenameChipSet = useCallback((newName: string) => {
        renameChipSet(chipSet.key, newName)
    }, [renameChipSet, chipSet.key]);

    const handleAddChip = useCallback(() => {
        const newName = prompt(`new ${chipSet.name} chip`)
        if (newName) {
           // const chip: Chip = { key: nanoid(), name: newName}
            addChip(chipSet.key, newName)
        }
    }, [addChip, chipSet.key])
    return <>
        <AsSelectableUl key={chipSet.key} title={chipSetName} setTitle={setChipSetName} handleNewTitle={handleRenameChipSet} handleAddItem={handleAddChip} >
            {/* map chips in chipset */}
            {chipSet.chips.map((chip, index) => {
                return <ChipLineItem key={chip.key} chip={chip} chipSetKey={chipSet.key}></ChipLineItem>
            })}
        </AsSelectableUl>
    </>
}


interface ChipLineItemProps {
    chip: Chip
    chipSetKey: string
}


const ChipLineItem = ({ chip, chipSetKey }: ChipLineItemProps) => {
    // the page level line item
    const [chipName, setChipName] = useState<string>(chip.name)
    const handleRenameChip = (newName: string) => {

    }
    const handleAddChip = () => {
        // prompt for user specific chip name
    }
    return <>
        <AsSelectableLi keyStr={chip.key} title={chipName} setTitle={setChipName} handleNewTitle={handleRenameChip} handleClickItem={handleAddChip}>
            {/* chip name */}
            {chip.name}
        </AsSelectableLi>
    </>
}