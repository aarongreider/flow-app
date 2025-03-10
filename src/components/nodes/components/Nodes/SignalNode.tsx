import { NodeProps } from 'reactflow';
import Input from '../Input';
import NodeWrapper from './NodeWrapper';

function SignalNode(props: NodeProps) {
  return (
    <NodeWrapper nodeProps={props} className='signal-node'>
      <Input id={props.id} dataKey="signal" defaultText='SignalKey' />
    </NodeWrapper>
  );
}

export default SignalNode;
