import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { ChipSelect } from "./ChipSelect";
import { ChipSetSelect } from "./ChipSetSelect";


interface ChipDashProps {
    visible: boolean;
}

export function ChipsDashboard({ visible }: ChipDashProps) {
    const projectChipSets = useStore((state) => state.projectChipSets);
    const [childVisible, setChildVisible] = useState<boolean>(false)

    useEffect(() => {
        if (!visible) {
            setChildVisible(false)
        }
    }, [visible])

    useEffect(() => {
        localStorage.setItem('chips', JSON.stringify(projectChipSets))
    }, [projectChipSets])


    return <>
        <ChipSelect visible={childVisible} draggable={true}></ChipSelect>
        <ChipSetSelect visible={visible} setChildVisible={setChildVisible}></ChipSetSelect>
    </>
}
export default ChipsDashboard


