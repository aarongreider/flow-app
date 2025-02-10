import { ReactNode, useState } from "react"

interface SelectableUlProps {
    title: string
    setTitle: (newTitle: string) => void
    handleNewTitle: (newTitle: string) => void
    handleAddItem: () => void
    children: ReactNode
}
export const AsSelectableUl = ({ title, setTitle, handleNewTitle, handleAddItem, children }: SelectableUlProps) => {
    const [toggled, setToggled] = useState<boolean>(false)
    const [isRenaming, setIsRenaming] = useState<boolean>(false)

    return <>
        <li className='toggle' style={{ listStyleType: `${toggled ? "disclosure-open" : "disclosure-closed"}` }} onClick={(e) => {
            if (e.target instanceof Element && e.target.classList.contains("toggle"))
                setToggled(!toggled)
        }}>
            <div className="toggle" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* conditionally display the input field when isRenaming is true */}
                {isRenaming ? (<>
                    <input type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={(e) => {
                            handleNewTitle(e.target.value)
                            console.log(`renaming ${title}`, e.target.value)
                        }} // Rename on blur
                    /></>
                ) : (
                    <>{title}</>
                )}
                <div className='toolbar'>
                    <span style={{ fontSize: "1em" }} className="material-symbols-outlined toolbarButton" onClick={() => setIsRenaming(!isRenaming)}>
                        {isRenaming ? "check" : "edit"}
                    </span>
                    <span onClick={handleAddItem} className="material-symbols-outlined toolbarButton">add</span>
                </div>
            </div>
            <ul style={{ display: `${toggled ? 'block' : 'none'}` }}>
                {children}
            </ul>
        </li></>
}