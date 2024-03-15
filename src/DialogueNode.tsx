import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';
import useStore from './store';

const handleStyle = { left: 10 };

function DialogueNode(props: NodeProps) {
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
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div>
        <label htmlFor='character'>Name:</label>
        <input id="character"></input>
        <label htmlFor="text">Input:</label>
        <textarea id="text" name="text" onChange={(onChange)} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default DialogueNode;
