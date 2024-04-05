import { Handle, Position, NodeProps } from 'reactflow';
import Input from './Input';
import { useState } from 'react';
import DeleteNodeButton from './DeleteNodeButton';
import SelectNodeButton from './SelectNodeButton';

function TokenNode(props: NodeProps) {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <div className={`token-node nodeWrapper ${selected ? 'selected' : ''}`}>
      {selected ? <DeleteNodeButton id={props.id} /> : undefined}
      <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <Input id={props.id} dataKey="token" defaultText='TokenKey' />
      <Handle className="handle source" type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
    </div>
  );
}

export default TokenNode;
