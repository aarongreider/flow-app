//#region imports
import NodeEditor from './components/NodeEditor';
import { Link, Route, Routes } from 'react-router-dom';
import { ProjectHome } from './components/ProjectsPopup';
import Firebase from './Firebase';
//#endregion


export default function App() {

  return <>
    <ul style={{ position: 'absolute', left: '50%', zIndex: 200 }}>
      <li><Link to="/">Projects</Link></li>
      <li><Link to="/editor">Node Editor</Link></li>
    </ul>
    <Firebase />

    <Routes>
      <Route path="/editor/:projectKey/:pageKey" element={<NodeEditor></NodeEditor>} />
      <Route path="/" element={<ProjectHome></ProjectHome>} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  </>
}