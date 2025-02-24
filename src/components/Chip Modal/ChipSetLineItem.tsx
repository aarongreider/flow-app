import { useState } from "react";
import { Chip, ChipSet } from "../../utils/types";
import ChipLi from "./ChipLineItem";
import { AsSelectableUl } from "../Layout Wrappers/SelectableUL";
import useStore from "../../store/store";
import { nanoid } from "nanoid";

interface ChipSetLineItemProps {
    chipSet: ChipSet
}
export default function ChipSetLineItem({ chipSet }: ChipSetLineItemProps) {
    const [chipSetName, setChipSetName] = useState<string>(chipSet.name)
    const renameChipSet = useStore((state) => state.renameChipSet);
    const addChip = useStore((state) => state.addChip);

    const handleRenameChipSet = (newName: string) => {
        console.log("renaming chipSet: ", newName, chipSet.key);
        setChipSetName(newName)
        renameChipSet(chipSet.key, newName)
    }
    const handleAddChip = () => {
        console.log("adding a new chip");
        const response = prompt('New Chip Name:');
        if (response) {
            console.log("adding chip,", response);

            addChip(chipSet.key, { name: response, key: nanoid() } as Chip)
        }
    }
    return <>
        <AsSelectableUl title={chipSetName}
            setTitle={setChipSetName}
            handleNewTitle={handleRenameChipSet}
            handleAddItem={handleAddChip}
        >
            {/* map chips in chipset */}
            {chipSet.chips.map((chip, index) => {
                return <ChipLi chip={chip} key={index} chipSetKey={chipSet.key}></ChipLi>
            })}
        </AsSelectableUl>
    </>
}