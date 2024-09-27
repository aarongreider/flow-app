import { nanoid } from "nanoid";
import { ChipSet } from '../types';


export const createChipsSlice = (set: any, get: any) => ({
    activeChipSet: undefined,
    projectChipSets: [
        { key: nanoid(), name: "signals", chips: [{ key: nanoid(), name: 'getMasterSword' }, { key: nanoid(), name: 'slayGanon' }, { key: nanoid(), name: 'getFetchQuest' }] },
        { key: nanoid(), name: "characters", chips: [{ key: nanoid(), name: 'Aragorn' }, { key: nanoid(), name: 'Frodo' }, { key: nanoid(), name: 'Gandalf' }] },
        { key: nanoid(), name: "tokens", chips: [{ key: nanoid(), name: 'hasSword' }, { key: nanoid(), name: 'hasShield' }, { key: nanoid(), name: 'hasFetchQuest' }] },
        { key: nanoid(), name: "quests", chips: [{ key: nanoid(), name: 'FindTheRing' }, { key: nanoid(), name: 'DestroyTheRing' }] },
    ],

    setActiveChipSet: (chipSet: ChipSet) => {
        set({ activeChipSet: chipSet })
        console.log("setting active chipset");

    },
})