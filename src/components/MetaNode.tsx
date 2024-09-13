import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';
import { useState } from 'react';
import DeleteNodeButton from './DeleteNodeButton';
import SelectNodeButton from './SelectNodeButton';

function MetaNode(props: NodeProps) {
    const [selected, setSelected] = useState<boolean>(false)
    return (
        <div className={`meta-node nodeWrapper ${selected ? 'selected' : ''}`}>
            {selected ? <DeleteNodeButton id={props.id} /> : undefined}
            <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
            <TextArea id={props.id} dataKey={"meta"} defaultText='The character fetches 3 mushrooms, solemnly bring them back to Jumbo, the ancient sea snail.' />
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
        </div>
    );
}

export default MetaNode;
