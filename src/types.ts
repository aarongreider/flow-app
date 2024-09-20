import { nanoid } from 'nanoid';
import { Edge, Node, useStore, } from 'reactflow';

// Define general types used across the project
export type PageFetch = {
    nodes: Node[];
    edges: Edge[];
}

export type MetadataFetch = {
    register: Project[];
    tokens: string;
}

/* export type Register = [
    { name: string, pages: Page[] }
] */

export type Project = { name: string, pages: Page[] }

export type Page = { name: string, key: string }

const register: Project[] = [
    {
        name: 'project 1',
        pages: [{ name: 'page1', key: nanoid() }, { name: 'page2', key: nanoid() }, { name: 'page3', key: nanoid() },]
    },
    {
        name: 'project 2',
        pages: [{ name: 'page1', key: nanoid() }, { name: 'page2', key: nanoid() }, { name: 'page3', key: nanoid() },]
    },
]

export const getProjectIndex = (register: Project[], projectName: string): number => {
    const projectIndex = register.findIndex(project => project.name === projectName);
    console.log("project index found", projectIndex); // Output: 0 (if 'project 1' is the first project)
    return projectIndex;
}

export const getPageIndex = (register: Project[], projectIndex: number, pageName: string): number => {
    const pageIndex = register[projectIndex].pages.findIndex(page => page.name === pageName);

    console.log("page index found", pageIndex);
    return pageIndex;
}