import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';

function ExpositionNode(props: NodeProps) {

  return (
    <div className="exposition-node nodeWrapper">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <TextArea id={props.id} dataKey='exposition' defaultText="In world, where sea slugs ruled the land..." />
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default ExpositionNode;
