import { ReactNode } from "react"

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