import { Handle, Position, NodeProps } from 'reactflow';
import Input from './Input';

function ResponseNode(props: NodeProps) {
  return (
    <div className="response-node nodeWrapper">
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <Input id={props.id} dataKey='response' defaultText="I'm good, thanks!" />
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default ResponseNode;