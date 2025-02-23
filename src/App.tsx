//#region imports
import NodeEditor from './components/NodeEditor';
import { Link, Route, Routes } from 'react-router-dom';
import { ProjectHome } from './components/Projects Modal/ProjectsPopup';
import Firebase from './components/Firebase';
import { DndContextComp } from './components/DragNDrop/DnDContext';
//#endregion


export default function App() {
  const rootDir = import.meta.env.PROD ? "https://aaron.greider.org/flow-app/dist" : ''

  return <>
    <ul style={{ position: 'absolute', left: '50%', zIndex: 200, display: `${window.innerWidth > 450 ? 'block' : 'none'}` }}>
      <li><Link to={`${rootDir}/projects`}>Projects</Link></li>
      <li><Link to={`${rootDir}/editor`}>Node Editor</Link></li>
      <li><Link to={`${rootDir}/Dnd`}>DragNDrop</Link></li>
    </ul>
    <Firebase />

    <Routes >
      <Route path={`${rootDir}/editor/:projectKey/:pageKey`} element={<NodeEditor></NodeEditor>} />
      <Route path={`${rootDir}/projects`} element={<ProjectHome></ProjectHome>} />
      <Route path={`${rootDir}/Dnd`} element={<DndContextComp></DndContextComp>} />
      <Route path={`*`} element={<h1>404</h1>} />
    </Routes>
  </>
}