import { useState } from 'react';
import useStore from '../store';
import { Project } from 'reactflow';

interface PopupProps {
    visible: boolean
}

function ProjectsPopup({visible}: PopupProps) {
    const register = useStore((state) => state.register);
    return <>
        <div className={visible ? 'visible' : 'hidden'} style={{zIndex: 100, position: 'absolute'}}>
            <h1 className='ProjectsPopup'>Projects</h1>
            <ul>
                {Object.keys(register).map((project) => (
                    <ProjectWidget key={project} name={project} pages={register[project]}></ProjectWidget>
                ))}
            </ul>

        </div>
    </>
}

export default ProjectsPopup;

interface ProjectWidgetProps {
    name: string;
    pages: string[];
}

function ProjectWidget({name, pages}: ProjectWidgetProps) {
    //const register = useStore((state) => state.register);
    return <>
        <li>{name}
            <ul>
                {pages.map((page) => (
                    <li key={page}>{page}</li>
                ))}
            </ul>
        </li>
    </>
}