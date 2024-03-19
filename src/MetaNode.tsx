import { useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useStore from './store';

function MetaNode(props: NodeProps) {
    const nodes = useStore((state) => state.nodes);
    const updateNodeText = useStore((state) => state.updateNodeText);

    const [meta, setMeta] = useState(nodes.find(node => node.id === props.id)?.data?.meta ?? "The character fetches 3 mushrooms, solemnly bring them back to Jumbo, the ancient sea snail.");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        updateNodeText(props.id, { meta: meta })
    }, [meta])

    useEffect(() => {
        // resize text area
        console.log(textAreaRef.current)
        if (textAreaRef.current) {
            // We need to reset the height first to get the correct scrollHeight for the textarea
            textAreaRef.current.style.height = '0px'
            const { scrollHeight } = textAreaRef.current

            // Now we set the height directly
            textAreaRef.current.style.height = `${scrollHeight}px`
        }

    }, [textAreaRef, meta])

    const onChange = useCallback((evt: any) => {
        //console.log(reactFlowInstance.getNode(props.id))
        setMeta(evt.target.value)
    }, []);

    return (
        <div className="meta-node">
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
            <textarea ref={textAreaRef} id="meta" onChange={onChange} value={meta}></textarea>
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
        </div>
    );
}

export default MetaNode;
