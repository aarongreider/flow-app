import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';
import Input from './Input';

import DeleteNodeButton from './DeleteNodeButton';
import SelectNodeButton from './SelectNodeButton';

function DialogueNode(props: NodeProps) {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <div className={`dialogue-node nodeWrapper ${selected ? 'selected' : ''}`}>
      {selected ? <DeleteNodeButton id={props.id} /> : undefined}
      <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} /* style={{ top: '-15px' }} */ />
      <div>
        <p className='characterLabel'>Character</p>
        <Input id={props.id} dataKey={"character"} defaultText='Mumbo Jumbo' />
        <TextArea id={props.id} dataKey={"dialogue"} defaultText='Hi! How are you today?'></TextArea>
      </div>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable}>
      </Handle>
    </div>
  );
}

export default DialogueNode;
