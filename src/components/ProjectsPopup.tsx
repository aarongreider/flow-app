import { useState } from 'react';
import useStore from '../store';
import { Page } from '../types';

interface PopupProps {
    visible: boolean
    toggleVisible: () => void
}

function ProjectsPopup({ visible, toggleVisible }: PopupProps) {
    const register = useStore((state) => state.register);
    return <>
        <p>{JSON.stringify(register)}</p>
        <div className="projectPopupContainer" style={{ display: `${visible ? 'flex' : 'none'}` }} onClick={(e) => {
            // Only trigger if the clicked element is the parent container (projectPopupContainer)
            if (e.target === e.currentTarget) {
                toggleVisible();
            }
        }}>
            <div className='projectPopup' style={{ zIndex: 100, position: 'relative' }}>
                <button onClick={toggleVisible} style={{ zIndex: 101, position: 'absolute', right: '-20px', top: '-12px' }}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h1 className='ProjectsPopup'>Projects</h1>
                <ul>
                    {register.map((project) => (
                        <ProjectWidget key={project.name} projectName={project.name} pages={project.pages}></ProjectWidget>
                    ))}
                </ul>
            </div>
        </div>
    </>
}

export default ProjectsPopup;




interface ProjectWidgetProps {
    projectName: string;
    pages: Page[];
}

function ProjectWidget({ projectName, pages }: ProjectWidgetProps) {
    const addPage = useStore((state) => state.addPage);
    const [toggled, setToggled] = useState<boolean>(false)

    const handleAddPage = () => {
        const response = prompt('New Page Name:');
        if (response) {
            addPage(projectName, response)
        }
    }
    return <>
        {/* classname toggle is used to designate which elements will toggle the pages */}
        <li className='toggle' onClick={(e) => { if (e.target instanceof Element && e.target.classList.contains("toggle")) { setToggled(!toggled) } }} style={{ listStyleType: `${toggled ? "disclosure-open" : "disclosure-closed"}` }}>
            <div className="toggle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {projectName}
                <span onClick={handleAddPage} className="material-symbols-outlined">add</span>
            </div>
            <ul style={{ display: `${toggled ? 'block' : 'none'}` }}>
                {pages.map((page) => (
                    <PageWidget key={page.key} project={projectName} page={page}></PageWidget>
                ))}
            </ul>
        </li>
    </>
}



interface PageWidgetProps {
    project: string;
    page: Page;
}

function PageWidget({ project, page }: PageWidgetProps) {
    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    const [pageName, setPageName] = useState<string>(page.name)

    const setActivePath = useStore((state) => state.setActivePath);
    const updatePageName = useStore((state) => state.updatePageName);

    const renamePage = (newName: string) => {
        updatePageName(project, page.key, newName)
        setPageName(newName)
    }

    return <>
        <li key={page.key} onClick={(e) => {
            if (e.target === e.currentTarget) {
                if (!isRenaming) {
                    setActivePath({ projectKey: project, pageKey: page.key })
                }
            }
        }}>

            {/* conditionally display the input field when isRenaming is true */}
            {isRenaming ? (<>
                <input type="text"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    onBlur={(e) => {
                        renamePage(e.target.value)
                        console.log(`renaming ${pageName}`, e.target.value)
                    }} // Rename on blur
                /></>
            ) : (
                <>{pageName}</>
            )}

            <div className='pageToolbar' style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                {/* <span className="material-symbols-outlined">more_horiz</span> */}
                <span style={{ fontSize: "1em" }} className="material-symbols-outlined" onClick={() => setIsRenaming(!isRenaming)}>
                    {isRenaming ? "check" : "edit"}
                </span>
                {/* <span className="material-symbols-outlined">chevron_right</span> */}
            </div>
        </li>
    </>
}