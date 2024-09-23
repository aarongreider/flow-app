//#region imports
import NodeEditor from './components/NodeEditor';
import { Link, Route, Routes } from 'react-router-dom';
import ProjectsPopup from './components/ProjectsPopup';
import Firebase from './Firebase';

//#endregion


export default function App() {
  const toggle = () => {
    return true;
  }

  return <>
    <ul>
      <li><Link to="/">Projects</Link></li>
      <li><Link to="/editor">Node Editor</Link></li>
    </ul>
    <Firebase />

    <Routes>
      <Route path="/editor" element={<NodeEditor></NodeEditor>} />
      <Route path="/" element={<ProjectsPopup visible={true} toggleVisible={toggle}></ProjectsPopup>} />
    </Routes>
  </>
}