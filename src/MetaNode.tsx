import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useStore from './store';

function MetaNode(props: NodeProps) {
    const nodes = useStore((state) => state.nodes);
    const updateNodeText = useStore((state) => state.updateNodeText);

    const [meta, setMeta] = useState(nodes.find(node => node.id === props.id)?.data?.meta ?? "The character fetches 3 mushrooms, solemnly bring them back to Jumbo, the ancient sea snail.");

    useEffect(() => {
        updateNodeText(props.id, { meta: meta })
    }, [meta])

    const onChange = useCallback((evt: any) => {
        //console.log(reactFlowInstance.getNode(props.id))
        setMeta(evt.target.value)
    }, []);

    return (
        <div className="meta-node">
            <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
            <textarea id="meta" className="nodrag" onChange={onChange} value={meta}></textarea>
            <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
        </div>
    );
}

export default MetaNode;
