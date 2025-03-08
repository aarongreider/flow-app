//#region imports
import NodeEditor from './components/NodeEditor';
import { Route, Routes } from 'react-router-dom';
import { ProjectHome } from './components/Projects Modal/ProjectsPopup';
import Firebase from './components/Firebase';
import { DndContextComp } from './components/DragNDrop/DnDContext';
import Listener from './components/Listener';
//#endregion


export default function App() {
  //const rootDir = import.meta.env.PROD ? "https://aaron.greider.org/flow-app/dist" : ''

  return <>
    {/* <ul style={{ position: 'absolute', left: '50%', zIndex: 200, display: `${window.innerWidth > 450 ? 'block' : 'none'}` }}>
      <li><Link to={`/projects`}>Projects</Link></li>
      <li><Link to={`/editor`}>Node Editor</Link></li>
      <li><Link to={`/Dnd`}>DragNDrop</Link></li>
    </ul> */}
    <Firebase />
    <Listener />

    <Routes >
      <Route path={`/editor/:projectKey/:pageKey`} element={<NodeEditor></NodeEditor>} />
      <Route path={`/projects`} element={<ProjectHome></ProjectHome>} />
      <Route path={`/Dnd`} element={<DndContextComp></DndContextComp>} />
      <Route path={`*`} element={<ProjectHome></ProjectHome>} />
    </Routes>
  </>
}