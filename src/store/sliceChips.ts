import { nanoid } from 'nanoid';
import { ChipSet, Chip, getProjectIndex } from '../types';


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

    addChip: (setKey: string, chip: Chip, chipkey?: string) => {
        console.log("adding chips feature isn't finished yet");
        console.log(setKey, chip, chipkey && chipkey);


        const newProjectChipSets: ChipSet[] = [...get().projectChipSets]; // shallow clone of chipsets
        const chipSetIndex = getProjectIndex(newProjectChipSets, setKey);
        const newChip: Chip = { name: chip.name, key: chipkey ?? nanoid() }

        if (chipSetIndex !== -1) {
            // deep clone the project being modified
            const updatedChipSet = {
                ...newProjectChipSets[chipSetIndex],
                chips: [...newProjectChipSets[chipSetIndex].chips, newChip] // create a new array with the new page
            };
            // Replace the specific project in the register array
            console.log("found chipset: ", newProjectChipSets[chipSetIndex]);

            newProjectChipSets[chipSetIndex] = updatedChipSet;
            set({ projectChipSets: newProjectChipSets })
        } else {
            // else push new project to the register project array
            // no chipset index found, creating new chipset for new chip
            get().addChipSet(setKey, undefined, [chip])
        }
    },

    addChipSet: (chipSetName: string, chipSetKey?: string, chips?: Chip[]) => {
        const newProjectChipSets: ChipSet[] = [...get().projectChipSets]; // shallow clone of chipsets

        newProjectChipSets.push({ name: chipSetName, key: chipSetKey ?? nanoid(), chips: chips ?? [] })
        set({ projectChipSets: newProjectChipSets })
    },
})