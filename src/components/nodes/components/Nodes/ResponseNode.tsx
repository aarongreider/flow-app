import { NodeProps } from 'reactflow';
import Input from '../Input';
import { useState } from 'react';
import NodeWrapper from './NodeWrapper';

function ResponseNode(props: NodeProps) {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <NodeWrapper nodeProps={props} className='response-node' selected={selected} setSelected={setSelected}>
      <Input id={props.id} dataKey='response' defaultText="I'm good, thanks!" />
    </NodeWrapper>
  );
}

export default ResponseNode;