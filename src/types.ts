import { Edge, Node, } from 'reactflow';

// Define general types used across the project
export type PageFetch = {
    nodes: Node[];
    edges: Edge[];
}

export type MetadataFetch = {
    register: Register;
    tokens: string;
}

export type Register = {
    [project: string]: string[];
}

const register: Register = {
    project1: ['page1', 'page2', 'page3'],
    project2: ['page1', 'page2', 'page3'],
}