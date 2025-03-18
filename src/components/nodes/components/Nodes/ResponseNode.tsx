import { NodeProps } from 'reactflow';
import Input from '../Input';
import NodeWrapper from './NodeWrapper';

function ResponseNode(props: NodeProps) {
  return (
    <NodeWrapper nodeProps={props} className='response-node'>
      <Input id={props.id} dataKey='response' defaultText="I'm good, thanks!" />
    </NodeWrapper>
  );
}

export default ResponseNode;