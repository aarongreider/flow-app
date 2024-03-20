import { useState, useEffect } from 'react';
import { Handle, Position, NodeProps, Edge } from 'reactflow';
import useStore from './store';

function TextReceiverNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [attachedEdge, setAttachedEdge] = useState<Edge | undefined>(edges.find(edge => edge.target === props.id));
  const [sourceNode, setSourceNode] = useState<any>(attachedEdge ? nodes.find(node => node.id === attachedEdge.source) : undefined);

  useEffect(() => {
    const newEdge = edges.find(edge => edge.target === props.id) // returns undefined if no match
    setAttachedEdge(newEdge)
    if (newEdge) setSourceNode(nodes.find(node => node.id === attachedEdge?.source))
  }, [nodes, edges])

  return (
    <div className="text-receiver-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <p>{sourceNode ? sourceNode.data?.text : undefined}</p>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default TextReceiverNode;
