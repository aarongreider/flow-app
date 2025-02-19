import { Edge, Node } from 'reactflow';

// Define general types used across the project
export type PageFetch = {
    nodes: Node[];
    edges: Edge[];
}

export type MetadataFetch = {
    register: Project[];
    projectChipSets: ChipSet[];
}

export type PagePath = {
    projectKey: string,
    pageKey: string
}

export type Project = { name: string, key: string, pages: Page[], tokens?: string[] }
export type Page = { name: string, key: string }
export type Chip = { key: string, name: string }
export type ChipSet = { key: string, name: string, chips: Chip[] }
export type AppState = { nodes: Node[], edges: Edge[], chipSets: ChipSet[], register?: Project[] }
/* const register: Project[] = [
    {
        name: 'project 1',
        key: nanoid(),
        pages: [{ name: 'page1', key: nanoid() }, { name: 'page2', key: nanoid() }, { name: 'page3', key: nanoid() },],
        tokens: ['tokenKey1', 'tokenKey2'],
    },
    {
        name: 'project 2',
        key: nanoid(),
        pages: [{ name: 'page1', key: nanoid() }, { name: 'page2', key: nanoid() }, { name: 'page3', key: nanoid() },],
        tokens: ['tokenKey1', 'tokenKey2'],
    },
] */

export const getProjectIndex = (register: Project[] | ChipSet[], projectKey: string): number => {
    const projectIndex = register.findIndex(project => project.key === projectKey);
    console.log(`${projectKey} project index found`, projectIndex); // Output: 0 (if 'project 1' is the first project)
    return projectIndex;
}

export const getPageIndex = (register: Project[], projectIndex: number, pageKey: string): number => {
    const pageIndex = register[projectIndex].pages.findIndex(page => page.key === pageKey);

    console.log(`${pageKey} page index found`, pageIndex);
    return pageIndex;
}