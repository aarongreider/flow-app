import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';

function TextReceiverNode(props: NodeProps) {
  const [sourceText, setSourceText] = useState<string>();

  return (
    <div className="text-receiver-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <p>{props.id}</p>
      {sourceText ? <p>{`Source Text: not configured`}</p> : undefined} 
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default TextReceiverNode;
