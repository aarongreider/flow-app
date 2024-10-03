import { nanoid } from 'nanoid';
import { ChipSet, Chip } from '../types';


export const createChipsSlice = (set: any, get: any) => ({
    activeChipSet: undefined,
    projectChipSets: [
        /* { key: nanoid(), name: "signals", chips: [{ key: nanoid(), name: 'getMasterSword' }, { key: nanoid(), name: 'slayGanon' }, { key: nanoid(), name: 'getFetchQuest' }] },
        { key: nanoid(), name: "characters", chips: [{ key: nanoid(), name: 'Aragorn' }, { key: nanoid(), name: 'Frodo' }, { key: nanoid(), name: 'Gandalf' }] },
        { key: nanoid(), name: "tokens", chips: [{ key: nanoid(), name: 'hasSword' }, { key: nanoid(), name: 'hasShield' }, { key: nanoid(), name: 'hasFetchQuest' }] },
        { key: nanoid(), name: "quests", chips: [{ key: nanoid(), name: 'FindTheRing' }, { key: nanoid(), name: 'DestroyTheRing' }] }, */
    ],

    setActiveChipSet: (chipSet: ChipSet) => {
        set({ activeChipSet: chipSet })
        console.log("setting active chipset");

    },

    setChips: (chipSets: ChipSet[]) => {
        set({ projectChipSets: chipSets })
    },

    renameChip: (setKey: string, chipKey: string, newName: string) => {
        const projectChipSets: ChipSet[] = [...get().projectChipSets];
        const chipSetIndex = projectChipSets.findIndex(chipSet => chipSet.key === setKey);
        const chipIndex = projectChipSets[chipSetIndex].chips.findIndex(chip => chip.key === chipKey);
        projectChipSets[chipSetIndex].chips[chipIndex].name = newName;
        set({ projectChipSets })
    },

    renameChipSet: (setKey: string, newName: string) => {
        const projectChipSets: ChipSet[] = [...get().projectChipSets];
        const chipSetIndex = projectChipSets.findIndex(chipSet => chipSet.key === setKey);
        projectChipSets[chipSetIndex].name = newName;
        set({ projectChipSets })
    },

    addChip: (setKey: string, name: string) => {
        const projectChipSets: ChipSet[] = [...get().projectChipSets];
        const chipSetIndex = projectChipSets.findIndex(chipSet => chipSet.key === setKey);
        const chips = projectChipSets[chipSetIndex].chips
        chips.push({ key: nanoid(), name })
        projectChipSets[chipSetIndex].chips = chips;
        set({ projectChipSets })
    },

    addChipSet: (name: string) => {
        const projectChipSets: ChipSet[] = [...get().projectChipSets, { key: nanoid(), name, chips: [] }];
        set({ projectChipSets })
    },
})