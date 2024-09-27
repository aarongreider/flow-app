import { useState, useCallback, useEffect, useRef } from 'react';
import useStore from '../../store/store';

interface InputProps {
    id: string,
    dataKey: string,
    className?: string,
    defaultText: string,
    onChange?: (val: string) => void,
}

function Input({ id, dataKey, className, defaultText, onChange = () => {} }: InputProps) {
    const nodes = useStore((state) => state.nodes);
    const updateNodeText = useStore((state) => state.updateNodeData);

    const [textValue, setTextValue] = useState(nodes.find(node => node.id === id)?.data[dataKey] ?? defaultText);

    const inputRef = useRef<HTMLInputElement>(null);
    


    useEffect(() => {
        // set the state of the id passed in
        updateNodeText(id, { [dataKey]: textValue })

        // resize text area
        if (inputRef.current) {
            // We need to reset the height first to get the correct scrollWidth for the input
            inputRef.current.style.width = '0px'
            const { scrollWidth } = inputRef.current

            // Now we set the height directly
            inputRef.current.style.width = `${scrollWidth}px`
        }
        onChange(textValue)

    }, [inputRef, textValue])


    const onChangeInput = useCallback((evt: any) => {
        setTextValue(evt.target.value)
    }, []);

    return (
        <>
            <label htmlFor={dataKey} style={{ display: 'none' }} >{dataKey}</label>
            <input className={` ${className}`} ref={inputRef} id={dataKey} name={dataKey} onChange={(onChangeInput)} value={textValue} />
        </>
    );
}

export default Input;
