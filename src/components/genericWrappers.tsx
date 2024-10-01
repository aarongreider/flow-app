import { nanoid } from "nanoid"
import { ReactNode, useState } from "react"



interface PopupProps {
    visible: boolean
    children: ReactNode
    toggleVisible: () => void
}
export const WithPopUp = ({ visible, children, toggleVisible }: PopupProps) => {
    return (
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
                {children}
            </div>
        </div>
    )
}

interface UlModalProps {
    header: string;
    onClickAddButton: () => void;
    children: ReactNode;
}
export const WithUlModal = ({ header, onClickAddButton, children }: UlModalProps) => {
    return <>
        <h1 style={{ display: "flex", alignItems: 'center', gap: '.5em' }}>{header}
            <span style={{ fontSize: '1em' }} className="material-symbols-outlined toolbarButton" onClick={onClickAddButton}>add</span>
        </h1>
        <ul>
            {children}
        </ul>
    </>
}

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
        <li key={`${title}-${nanoid}`} className='toggle' style={{ listStyleType: `${toggled ? "disclosure-open" : "disclosure-closed"}` }} onClick={(e) => {
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

interface SelectableLiProps {
    title: string
    key: string
    setTitle: (newTitle: string) => void
    handleNewTitle: (newTitle: string) => void
    handleClickItem: () => void
    children: ReactNode
}
export const AsSelectableLi = ({ title, key, setTitle, handleNewTitle, handleClickItem, children }: SelectableLiProps) => {
    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    return <>
        <li key={key} onClick={(e) => {
            if (e.target === e.currentTarget) {
                if (!isRenaming) {
                    handleClickItem();
                }
            }
        }}>

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
                <>{children}</>
            )}

            <div className='toolbar'>
                {/* <span className="material-symbols-outlined">more_horiz</span> */}
                <span style={{ fontSize: "1em" }} className="material-symbols-outlined toolbarButton" onClick={() => setIsRenaming(!isRenaming)}>
                    {isRenaming ? "check" : "edit"}
                </span>
                {/* <span className="material-symbols-outlined">chevron_right</span> */}
            </div>
        </li>
    </>
}