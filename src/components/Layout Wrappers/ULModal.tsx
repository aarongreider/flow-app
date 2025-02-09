import { ReactNode } from "react";


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