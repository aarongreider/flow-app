import { ReactNode, useState } from "react"

interface SelectableLiProps {
    title: string

    setTitle: (newTitle: string) => void
    handleNewTitle: (newTitle: string) => void
    handleClickItem: () => void
    children: ReactNode
}

export const AsSelectableLi = ({ title, setTitle, handleNewTitle, handleClickItem, children }: SelectableLiProps) => {
    const [isRenaming, setIsRenaming] = useState<boolean>(false)
    return <>
        <li onClick={(e) => {
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