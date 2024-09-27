import { useState } from 'react';
import useStore from '../store/store';
import { Project, Page } from '../types';
import { Link } from 'react-router-dom';

interface PopupProps {
    visible: boolean
    toggleVisible: () => void
}

export function PopupContainer({ visible, toggleVisible }: PopupProps) {

    return <>
        {/* <p>{JSON.stringify(register)}</p> */}
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
                <ProjectSelect></ProjectSelect>
            </div>
        </div>
    </>
}

export function ProjectHome() {
    return <div className="projectHome"><ProjectSelect></ProjectSelect></div>
}

function ProjectSelect() {
    const register = useStore((state) => state.register);
    const addProject = useStore((state) => state.addProject);
    const handleAddProject = () => {
        const response = prompt('New Project Name:');
        if (response) {
            addProject(response)
        }
    }
    return <>
        <h1 style={{ display: "flex", alignItems: 'center', gap: '.5em' }}>Projects
            <span style={{ fontSize: '1em' }} className="material-symbols-outlined toolbarButton" onClick={handleAddProject}>add</span>
        </h1>
        <ul>
            {register.map((project) => (
                <ProjectWidget key={project.name} project={project} pages={project.pages}></ProjectWidget>
            ))}
        </ul>
    </>
}



interface ProjectWidgetProps {
    project: Project;
    pages: Page[];
}

function ProjectWidget({ project, pages }: ProjectWidgetProps) {
    const addPage = useStore((state) => state.addPage);
    const updateProjectName = useStore((state) => state.updateProjectName);
    const [toggled, setToggled] = useState<boolean>(false)
    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    const [projectName, setProjectName] = useState<string>(project.name)

    const handleAddPage = () => {
        const response = prompt('New Page Name:');
        if (response) {
            addPage(project.key, response)
        }
    }

    const handleRenameProject = (newName: string) => {
        updateProjectName(project.key, newName)
        setProjectName(newName)
    }

    return <>
        {/* classname toggle is used to designate which elements will toggle the pages */}
        <li className='toggle' style={{ listStyleType: `${toggled ? "disclosure-open" : "disclosure-closed"}` }} onClick={(e) => {
            if (e.target instanceof Element && e.target.classList.contains("toggle"))
                setToggled(!toggled)
        }}>
            <div className="toggle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* conditionally display the input field when isRenaming is true */}
                {isRenaming ? (<>
                    <input type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        onBlur={(e) => {
                            handleRenameProject(e.target.value)
                            console.log(`renaming ${projectName}`, e.target.value)
                        }} // Rename on blur
                    /></>
                ) : (
                    <>{projectName}</>
                )}
                <div className='toolbar'>
                    <span style={{ fontSize: "1em" }} className="material-symbols-outlined toolbarButton" onClick={() => setIsRenaming(!isRenaming)}>
                        {isRenaming ? "check" : "edit"}
                    </span>
                    <span onClick={handleAddPage} className="material-symbols-outlined toolbarButton">add</span>
                </div>
            </div>
            <ul style={{ display: `${toggled ? 'block' : 'none'}` }}>
                {pages.length == 0 ? <li><i style={{ fontFamily: "IvyJournal", color: 'grey' }}>{`No pages yet :)`}</i></li> : pages.map((page) => (
                    <PageWidget key={page.key} project={project} page={page}></PageWidget>
                ))}

            </ul>
        </li>
    </>
}



interface PageWidgetProps {
    project: Project;
    page: Page;
}

function PageWidget({ project, page }: PageWidgetProps) {
    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    const [pageName, setPageName] = useState<string>(page.name)

    const setActivePath = useStore((state) => state.setActivePath);
    const updatePageName = useStore((state) => state.updatePageName);

    const handleRenamePage = (newName: string) => {
        updatePageName(project.key, page.key, newName)
        setPageName(newName)
    }

    return <>
        <Link to={`/editor/${project.key}/${page.key}`}>
            <li key={page.key} onClick={(e) => {
                if (e.target === e.currentTarget) {
                    if (!isRenaming) {
                        setActivePath({ projectKey: project.key, pageKey: page.key })
                    }
                }
            }}>

                {/* conditionally display the input field when isRenaming is true */}
                {isRenaming ? (<>
                    <input type="text"
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                        onBlur={(e) => {
                            handleRenamePage(e.target.value)
                            console.log(`renaming ${pageName}`, e.target.value)
                        }} // Rename on blur
                    /></>
                ) : (
                    <>{pageName}</>
                )}

                <div className='toolbar'>
                    {/* <span className="material-symbols-outlined">more_horiz</span> */}
                    <span style={{ fontSize: "1em" }} className="material-symbols-outlined toolbarButton" onClick={() => setIsRenaming(!isRenaming)}>
                        {isRenaming ? "check" : "edit"}
                    </span>
                    {/* <span className="material-symbols-outlined">chevron_right</span> */}
                </div>
            </li>
        </Link>
    </>
}