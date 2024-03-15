import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';
import useStore from './store';

function ResponseNode(props: NodeProps) {
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [userText, setUserText] = useState('Default Text');

  useEffect(() => {
    updateNodeText(props.id, userText)
  }, [userText])


  const onChange = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setUserText(evt.target.value)
  }, []);

  return (
    <div className="response-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
        <input id="response"></input>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default ResponseNode;
