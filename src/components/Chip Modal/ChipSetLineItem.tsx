import { useState } from "react";
//import { AsSelectableUl } from "../../Layout Wrappers/PopUp";
import { ChipSet } from "../../types";
import ChipLi from "./ChipLineItem";
import { AsSelectableUl } from "../Layout Wrappers/SelectableUL";

interface ChipSetLineItemProps {
    chipSet: ChipSet
}
export default function ChipSetLineItem({ chipSet }: ChipSetLineItemProps) {
    const [chipSetName, setChipSetName] = useState<string>(chipSet.name)
    const handleRenameChipSet = (newName: string) => {
        console.log("adding a new chipset ", newName);

    }
    const handleAddChipSet = () => {
        console.log("adding a new chipset");

    }
    return <>
        <AsSelectableUl title={chipSetName} setTitle={setChipSetName} handleNewTitle={handleRenameChipSet} handleAddItem={handleAddChipSet} >
            {/* map chips in chipset */}
            {chipSet.chips.map((chip, index) => {
                return <ChipLi chip={chip} key={index} chipSetKey={chipSet.key}></ChipLi>
            })}
        </AsSelectableUl>
    </>
}