import {
    Edge,
    Node,
  } from 'reactflow';

export const initialNodes = [
    { id: '1', position: { x: 10, y: 0 }, data: { label: '1' }, type: 'dialogue' },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, type: 'dialogue' },
];


export const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'customEdge' }];

type UserState = {
    nodes: Node[];
    edges: Edge[];
  }
  
  export function loadInitialState(isAuthenticated: boolean, user?: any) {
    // this function gets the initial state depending on if the user is logged on or not. 
  
    const initial: UserState = { nodes: [], edges: [] }
    
    // default: if no logged in user, get or assign cached values
    /* let cache = getCachedNodes()
    initial.nodes = cache.nodes;
    initial.edges = cache.edges; */
  
    if (isAuthenticated && user) {
        // trigger the setting of user data 
      const userID = user.sub.split("|")[1]
      //applyUserNodes(userID);
    }
  }
  
  function getCachedNodes() {
    const cache: UserState = { nodes: [], edges: [] }
    // get cached nodes or assign cached nodes
    if (!localStorage.getItem('nodes') || !localStorage.getItem('edges')) {
      localStorage.setItem('nodes', JSON.stringify(initialNodes))
      localStorage.setItem('edges', JSON.stringify(initialEdges))
    }
    let lsNode = localStorage.getItem('nodes') ?? ''
    let lsEdge = localStorage.getItem('edges') ?? ''
  
    // Retrieve nodes and edges from localStorage or use initial values
    cache.nodes = JSON.parse(lsNode) ?? initialNodes;
    cache.edges = JSON.parse(lsEdge) ?? initialEdges;
  
    return cache;
  
  }