import { nanoid } from "nanoid"
import { getPageIndex, getProjectIndex, Page, PagePath, Project } from '../types';



export const createProjectMgmtSlice = (set: any, get: any) => ({
    register: [],
    activePath: undefined, //{projectKey: '', pageKey: ''},
    lastChange: new Date,
    lastSave: new Date,



    setActivePath: (path: PagePath) => {
        set({ activePath: path })
    },

    setRegister: (register: Project[]) => {
        set({ register })
    },
    updateProjectName: (projectKey: string, newProjectName: string) => {
        const register = [...get().register]
        //console.log("register before:", register);

        const projectIndex = getProjectIndex(register, projectKey);
        register[projectIndex].name = newProjectName;

        //console.log("register after:", register);

        set({ register })
    },
    updatePageName: (projectKey: string, pageKey: string, newPageName: string,) => {
        const register = [...get().register]
        //console.log("register before:", register);

        const projectIndex = getProjectIndex(register, projectKey);
        const pageIndex = getPageIndex(register, projectIndex, pageKey);
        register[projectIndex].pages[pageIndex].name = newPageName

        //console.log("register after:", register);

        set({ register })
    },
    addPage: (projectKey: string, pageName: string, pageKey?: string) => {
        const newRegister = [...get().register] // shallow clone of register
        const projectIndex = getProjectIndex(newRegister, projectKey);
        const newPage: Page = { name: pageName, key: pageKey ?? nanoid() }

        if (projectIndex !== -1) {
            // deep clone the project being modified
            const updatedProject = {
                ...newRegister[projectIndex],
                pages: [...newRegister[projectIndex].pages, newPage] // create a new array with the new page
            };
            // Replace the specific project in the register array
            newRegister[projectIndex] = updatedProject;
            set({ register: newRegister })
        } else {
            // else push new project to the register project array
            get().addProject(projectKey, undefined, [newPage])
        }

    },
    addProject: (projectName: string, projectKey?: string, pages?: Page[]) => {
        const newRegister = [...get().register] // shallow clone of register

        newRegister.push({ name: projectName, key: projectKey ?? nanoid(), pages: pages ?? [], tokens: [] })
        set({ register: newRegister })
    },
    setLastChange: (lastChange: Date) => {
        set({ lastChange })
    },
    setLastSave: (lastSave: Date) => {
        set({ lastSave })
    }
})