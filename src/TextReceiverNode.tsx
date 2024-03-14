import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';

function TextReceiverNode(props: NodeProps) {
  const reactFlowInstance = useReactFlow();

  //console.log("reactflowinstance:",reactFlowInstance.getNodes());


  const onChange = useCallback((evt: any) => {

  }, []);

  return (
    <div className="text-receiver-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <p>{props.id}</p>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default TextReceiverNode;
