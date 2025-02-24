import { useState } from "react";
import useStore from "../../store/store";
import { Link } from "react-router-dom";
import { AsSelectableLi } from "../Layout Wrappers/SelectableListItem";
import { Page, Project } from "../../utils/types";

interface PageWidgetProps {
    project: Project;
    page: Page;
}

export default function PageWidget({ project, page }: PageWidgetProps) {
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