import { ReactNode } from "react";

interface WithLoadingProps {
    isLoading: boolean;
    children: ReactNode;
}

export const WithLoading = ({ isLoading, children }: WithLoadingProps) => {
    return (
        <>
            {isLoading ?
                <img style={{ width: '20px' }} src="https://media.tenor.com/2fE4s1GXDNEAAAAi/loading.gif" />
                : children}
        </>
    )
}