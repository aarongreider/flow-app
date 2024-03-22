import { Handle, Position, NodeProps } from 'reactflow';
import Input from './Input';

function SignalNode(props: NodeProps) {
  return (
    <div className="signal-node nodeWrapper">
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <Input id={props.id} dataKey="signal" defaultText='SignalKey' />
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default SignalNode;
