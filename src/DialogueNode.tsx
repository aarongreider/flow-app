import { useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';
import useStore from './store';

function DialogueNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [dialogue, setDialogue] = useState(nodes.find(node => node.id === props.id)?.data?.dialogue);
  const [character, setCharacter] = useState(nodes.find(node => node.id === props.id)?.data?.character);

  useEffect(() => {
    updateNodeText(props.id, { character: character, dialogue: dialogue })
  }, [dialogue, character])


  const onChangeDialogue = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setDialogue(evt.target.value)
  }, []);

  const onChangeCharacter = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setCharacter(evt.target.value)
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div>
        <label htmlFor='character'>Name:</label>
        <input id="character" onChange={(onChangeCharacter)} value={character}></input>
        <label htmlFor="dialogue">Input:</label>
        <textarea id="dialogue" name="dialogue" onChange={(onChangeDialogue)} className="nodrag" value={dialogue} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default DialogueNode;
