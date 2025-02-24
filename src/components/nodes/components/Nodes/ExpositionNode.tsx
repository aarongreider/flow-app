import { NodeProps } from 'reactflow';
import TextArea from '../TextArea';
import { useState } from 'react';
import DeleteNodeButton from '../DeleteNodeButton';
import NodeWrapper from './NodeWrapper';

function ExpositionNode(props: NodeProps) {

  const [selected, setSelected] = useState<boolean>(false)


  return (
    <NodeWrapper nodeProps={props} className='exposition-node' selected={selected} setSelected={setSelected}>
      {selected ? <DeleteNodeButton id={props.id} /> : undefined}
      <TextArea id={props.id} dataKey='exposition' defaultText="In world, where sea slugs ruled the land..." />
    </NodeWrapper>
  );
}

export default ExpositionNode;
