import { NodeProps } from 'reactflow';
import TextArea from '../TextArea';
import NodeWrapper from './NodeWrapper';

function ExpositionNode(props: NodeProps) {
  return (
    <NodeWrapper nodeProps={props} className='exposition-node'>
      <TextArea id={props.id} dataKey='exposition' defaultText="In world, where sea slugs ruled the land..." />
    </NodeWrapper>
  );
}

export default ExpositionNode;
