import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';
import Input from './Input';

function DialogueNode(props: NodeProps) {

  return (
    <div className="dialogue-node nodeWrapper">
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} /* style={{ top: '-15px' }} */ />
      <div>
        <p className='characterLabel'>Character</p>
        <Input id={props.id} dataKey={"character"} defaultText='Mumbo Jumbo' />
        <TextArea id={props.id} dataKey={"dialogue"} defaultText='Hi! How are you today?'></TextArea>
      </div>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default DialogueNode;
