import { useState } from "react"
import { Chip } from "../../types"
import { AsSelectableLi } from "../Layout Wrappers/SelectableListItem"
import useStore from '../../store/store';

interface ChipLineItemProps {
    chip: Chip
    chipSetKey: string
}

export default function ChipLi({ chip, chipSetKey }: ChipLineItemProps) {
    const [chipName, setChipName] = useState<string>(chip.name)
    const renameChip = useStore((state) => state.renameChip);

    const handleRenameChip = (newName: string) => {
        console.log("renaming chip: ", newName, chipSetKey);
        setChipName(newName)
        renameChip(chipSetKey, chip.key, newName)
    }
    const handleClick = () => {
        console.log("you clicked", chip);
    }

    return <>
        <AsSelectableLi title={chipName} setTitle={setChipName} handleNewTitle={handleRenameChip} handleClickItem={handleClick}>
            {/* chip name */}
            {chip.name}
        </AsSelectableLi>
    </>
}