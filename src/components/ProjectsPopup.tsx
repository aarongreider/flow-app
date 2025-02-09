import { useState } from 'react';
import useStore from '../store/store';
import { Project, Page } from '../types';
import { Link } from 'react-router-dom';
import {/*  AsSelectableLi, AsSelectableUl, */ WithPopUp, /* WithUlModal */ } from './Layout Wrappers/PopUp';
import { AsSelectableLi } from './Layout Wrappers/SelectableListItem';
import { AsSelectableUl } from './Layout Wrappers/SelectableUL';
import { WithUlModal } from './Layout Wrappers/ULModal';



interface ProjectPopupProps {
    visible: boolean
    toggleVisible: () => void
}
interface ProjectWidgetProps {
    project: Project;
    pages: Page[];
}
interface PageWidgetProps {
    project: Project;
    page: Page;
}

export function ProjectPopup({ visible, toggleVisible }: ProjectPopupProps) {

    return <>
        <WithPopUp visible={visible} toggleVisible={toggleVisible}>
            <ProjectSelect></ProjectSelect>
        </WithPopUp>
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
        <WithUlModal header='Projects' onClickAddButton={handleAddProject}>
            {register.map((project) => (
                <ProjectWidget key={project.name} project={project} pages={project.pages}></ProjectWidget>
            ))}
        </WithUlModal>
    </>
}


function ProjectWidget({ project, pages }: ProjectWidgetProps) {
    const addPage = useStore((state) => state.addPage);
    const updateProjectName = useStore((state) => state.updateProjectName);
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
        <AsSelectableUl title={projectName} setTitle={setProjectName} handleNewTitle={handleRenameProject} handleAddItem={handleAddPage}>
            {pages.length == 0 ? <li><i style={{ fontFamily: "IvyJournal", color: 'grey' }}>{`No pages yet :)`}</i></li> : pages.map((page) => (
                <PageWidget key={page.key} project={project} page={page}></PageWidget>
            ))}
        </AsSelectableUl>
    </>
}


function PageWidget({ project, page }: PageWidgetProps) {
    const [pageName, setPageName] = useState<string>(page.name)
    const setActivePath = useStore((state) => state.setActivePath);
    const updatePageName = useStore((state) => state.updatePageName);

    const handleRenamePage = (newName: string) => {
        updatePageName(project.key, page.key, newName)
        setPageName(newName)
    }

    const handleClick = () => {
        setActivePath({ projectKey: project.key, pageKey: page.key })
    }

    return <>
        <Link to={`/editor/${project.key}/${page.key}`}>
            <AsSelectableLi title={pageName} key={page.key} setTitle={setPageName} handleNewTitle={handleRenamePage} handleClickItem={handleClick}>
                {pageName}
            </AsSelectableLi>
        </Link>
    </>
}