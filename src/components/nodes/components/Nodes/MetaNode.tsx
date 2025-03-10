import { NodeProps } from 'reactflow';
import TextArea from '../TextArea';
import NodeWrapper from './NodeWrapper';

function MetaNode(props: NodeProps) {
    return (
        <NodeWrapper nodeProps={props} className='meta-node'>
            <TextArea id={props.id} dataKey={"meta"} defaultText='The character fetches 3 mushrooms, solemnly bring them back to Jumbo, the ancient sea snail.' />
        </NodeWrapper>
    );
}

export default MetaNode;