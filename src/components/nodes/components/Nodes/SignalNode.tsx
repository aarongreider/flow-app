import { NodeProps } from 'reactflow';
import Input from '../Input';
import { useState } from 'react';
import DeleteNodeButton from '../DeleteNodeButton';
import NodeWrapper from './NodeWrapper';

function SignalNode(props: NodeProps) {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <NodeWrapper nodeProps={props} className='signal-node' selected={selected} setSelected={setSelected}>
      {selected ? <DeleteNodeButton id={props.id} /> : undefined}
      <Input id={props.id} dataKey="signal" defaultText='SignalKey' />
    </NodeWrapper>
  );
}

export default SignalNode;
