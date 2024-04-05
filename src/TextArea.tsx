import { useState, useCallback, useEffect, useRef } from 'react';
import useStore from './store';

interface TextAreaProps {
    id: string,
    dataKey: string,
    className?: string,
    defaultText: string,
}

function TextArea({ id, dataKey, className, defaultText }: TextAreaProps) {
    const nodes = useStore((state) => state.nodes);
    const updateNodeText = useStore((state) => state.updateNodeText);

    const [textValue, setTextValue] = useState(nodes.find(node => node.id === id)?.data[dataKey] ?? defaultText);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);


    useEffect(() => {
        // set the state of the id passd in
        updateNodeText(id, { [dataKey]: textValue })


        // resize text area
        if (textAreaRef.current) {
            // We need to reset the height first to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = '0px'
            const { scrollHeight } = textAreaRef.current

            // Now we set the height directly
            textAreaRef.current.style.height = `${scrollHeight}px`
        }

    }, [textAreaRef, textValue])



    const onChangeTextArea = useCallback((evt: any) => {
        setTextValue(evt.target.value)
    }, []);

    return (
        <>
            <label htmlFor={dataKey} style={{ display: 'none' }} >{dataKey}</label>
            <textarea className={`nodrag ${className}`} ref={textAreaRef} id={dataKey} name={dataKey} onChange={(onChangeTextArea)} value={textValue} />
        </>
    );
}

export default TextArea;
