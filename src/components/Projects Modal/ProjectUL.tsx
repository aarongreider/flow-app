import { useState } from "react";
import useStore from "../../store/store";
import { Page, Project } from "../../types";
import { AsSelectableUl } from "../Layout Wrappers/SelectableUL";
import PageWidget from "./PageLi";

interface ProjectULProps {
    project: Project;
    pages: Page[];
}

export function ProjectUL({ project, pages }: ProjectULProps) {
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
            {!pages || pages.length == 0 //todo: WTF IS GOING ON HERE TYPE ERROR????
                ? <li><i style={{ fontFamily: "IvyJournal", color: 'grey' }}>{`No pages yet :)`}</i></li>
                : pages.map((page) => (
                    <PageWidget key={page.key} project={project} page={page}></PageWidget>
                ))}
        </AsSelectableUl>
    </>
}