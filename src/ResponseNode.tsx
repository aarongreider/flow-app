import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';
import useStore from './store';

function ResponseNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [response, setResponse] = useState(nodes.find(node => node.id === props.id)?.data?.response ?? "");

  useEffect(() => {
    updateNodeText(props.id, { response: response })
  }, [response])

  const onChange = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setResponse(evt.target.value)
  }, []);

  return (
    <div className="response-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <input id="response" onChange={onChange} value={response}></input>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default ResponseNode;
