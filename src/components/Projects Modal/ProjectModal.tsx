import useStore from "../../store/store";
import { WithUlModal } from "../Layout Wrappers/ULModal";
import { ProjectUL } from "./ProjectUL";

export function ProjectSelect() {
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
                <ProjectUL key={project.name} project={project} pages={project.pages}></ProjectUL>
            ))}
        </WithUlModal>
    </>
}
