import { useEffect } from "react";
import useStore from "../store/store";

export default function Listener() {
    const setClientXY = useStore((state) => state.setClientXY);
    useEffect(() => {
        window.addEventListener('mousemove', setXY)


        return () => {
            window.removeEventListener('mousemove', setXY)

        }
    }, [])

    const setXY = (e: MouseEvent) => {
        setClientXY({ x: e.clientX, y: e.clientY })

    }

    return <></>
}