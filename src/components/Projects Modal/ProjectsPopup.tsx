import { WithPopUp } from '../Layout Wrappers/PopUp';
import { ProjectSelect } from './ProjectModal';

interface ProjectPopupProps {
    visible: boolean
    toggleVisible: () => void
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






