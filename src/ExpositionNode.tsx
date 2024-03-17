import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useStore from './store';

function ExpositionNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [exposition, setExposition] = useState(nodes.find(node => node.id === props.id)?.data?.exposition ?? "In world, where sea slugs ruled the land...");

  useEffect(() => {
    updateNodeText(props.id, { response: exposition })
  }, [exposition])

  const onChange = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setExposition(evt.target.value)
  }, []);

  return (
    <div className="exposition-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <textarea id="exposition" className="nodrag" onChange={onChange} value={exposition}></textarea>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default ExpositionNode;
