//#region imports
import NodeEditor from './components/NodeEditor';
import { Link, Route, Routes } from 'react-router-dom';
import { ProjectHome } from './components/Projects Modal/ProjectsPopup';
import Firebase from './components/Firebase';
import { DndContextComp } from './components/DragNDrop/DnDContext';
//#endregion


export default function App() {

  return <>
    {/* <ul style={{ position: 'absolute', left: '50%', zIndex: 200, display:`${window.innerWidth > 450 ? 'block' : 'none'}` }}>
      <li><Link to="/">Projects</Link></li>
      <li><Link to="/editor">Node Editor</Link></li>
      <li><Link to="/Dnd">DragNDrop</Link></li>
    </ul> */}
    <Firebase />

    <Routes >
      <Route path="/editor/:projectKey/:pageKey" element={<NodeEditor></NodeEditor>} />
      <Route path="/" element={<ProjectHome></ProjectHome>} />
      <Route path="/Dnd" element={<DndContextComp></DndContextComp>} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </>
}