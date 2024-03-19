import { useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps, useUpdateNodeInternals } from 'reactflow';
import useStore from './store';

function DialogueNode(props: NodeProps) {
  const updateNodeInternals = useUpdateNodeInternals();
  const nodes = useStore((state) => state.nodes);
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [dialogue, setDialogue] = useState(nodes.find(node => node.id === props.id)?.data?.dialogue);
  const [character, setCharacter] = useState(nodes.find(node => node.id === props.id)?.data?.character);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    updateNodeText(props.id, { character: character, dialogue: dialogue })
    updateNodeInternals(props.id);
  }, [dialogue, character])

  useEffect(() => {
    // resize text area
    console.log(textAreaRef.current)
    if (textAreaRef.current) {
      // We need to reset the height first to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px'
      const { scrollHeight } = textAreaRef.current

      // Now we set the height directly
      textAreaRef.current.style.height = `${scrollHeight}px`
    }

  }, [textAreaRef, dialogue])



  const onChangeDialogue = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setDialogue(evt.target.value)
  }, []);

  const onChangeCharacter = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setCharacter(evt.target.value)
  }, []);

  return (
    <div className="dialogue-node">
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} /* style={{ top: '-15px' }} */ />
      <div>
        <label className='characterLabel' htmlFor='character'>Character</label>
        <input id="character" onChange={(onChangeCharacter)} value={character}></input>
        <label className='dialogue' htmlFor="dialogue" style={{ display: 'none' }} >Dialogue</label>
        <textarea ref={textAreaRef} id="dialogue" name="dialogue" onChange={(onChangeDialogue)} value={dialogue} />
      </div>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default DialogueNode;
