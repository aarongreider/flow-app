import { Handle, Position, NodeProps } from 'reactflow';
import Input from './Input';
import { useState } from 'react';
import DeleteNodeButton from './DeleteNodeButton';
import SelectNodeButton from './SelectNodeButton';

function SignalNode(props: NodeProps) {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <div className="signal-node nodeWrapper">
      {selected ? <DeleteNodeButton id={props.id} /> : undefined}
      <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <Input id={props.id} dataKey="signal" defaultText='SignalKey' />
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default SignalNode;
