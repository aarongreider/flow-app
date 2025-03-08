import { NodeProps } from 'reactflow';
import TextArea from '../TextArea';
import { ReactNode, useState } from 'react';
import DeleteNodeButton from '../DeleteNodeButton';
import NodeWrapper from './NodeWrapper';
import { Duplicatable } from './Duplicatable';

function MetaNode(props: NodeProps) {
    const [selected, setSelected] = useState<boolean>(false)
    return (
        <Duplicatable>
            <NodeWrapper nodeProps={props} className='meta-node' selected={selected} setSelected={setSelected}>
                {selected ? <DeleteNodeButton id={props.id} /> : undefined}
                <TextArea id={props.id} dataKey={"meta"} defaultText='The character fetches 3 mushrooms, solemnly bring them back to Jumbo, the ancient sea snail.' />
            </NodeWrapper>
        </Duplicatable>
    );
}

export default MetaNode;