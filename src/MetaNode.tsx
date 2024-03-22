import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';

function MetaNode(props: NodeProps) {
    return (
        <div className="meta-node nodeWrapper">
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
            <TextArea id={props.id} dataKey={"meta"} defaultText='The character fetches 3 mushrooms, solemnly bring them back to Jumbo, the ancient sea snail.' />
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
        </div>
    );
}

export default MetaNode;
