import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';

function TextReceiverNode(props: NodeProps) {
  const reactFlowInstance = useReactFlow();
  const [userText, setUserText] = useState('Default Text');

  useEffect(() => {
    // set the data of the current node when state changes
    const node = reactFlowInstance.getNode(props.id)
    node ? node.data = { ...node?.data, text: userText } : undefined;
    console.log(node?.data)
  }, [userText])


  const onChange = useCallback((evt: any) => {

  }, []);

  return (
    <div className="text-receiver-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />

      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default TextReceiverNode;
