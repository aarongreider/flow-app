import { useEffect, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';
import Input from './Input'
import DeleteNodeButton from './DeleteNodeButton';
import SelectNodeButton from './SelectNodeButton';
import { useDroppable } from '@dnd-kit/core';
import { getChipName } from '../../nodeEditorUtils';
import useStore from '../../store/store';
import { Node } from 'reactflow';
import { ChipChip } from '../chips/ChipChip';
import { nanoid } from 'nanoid';

function DialogueNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const projectChipSets = useStore((state) => state.projectChipSets);
  const getNode = useStore((state) => state.getNode);

  const [selected, setSelected] = useState<boolean>(false)
  const [setKey, setSetKey] = useState<string>('')
  const [chipKey, setChipKey] = useState<string>('')

  const { setNodeRef } = useDroppable({
    id: props.id,
    data: {
      accepts: ['chip'],
    },
  });

  useEffect(() => {
    // TODO: there's got to be a better way than passing
    const node: Node | undefined = getNode(props.id);
    //console.log("the node in question", node);
    if (node?.data?.setKey) {
      //console.log('AHHHHHHHHH CHIPS HAVE CHANGED AHHHHHHHHHH',node.data.setKey, node.data.chipKey, node);

      // if the node has the keys in its data
      // then set the states of setKey and chipKey
      setSetKey(node.data.setKey)
      setChipKey(node.data.chipKey)
    }
  }, [nodes, projectChipSets])


  return (
    <div className={`dialogue-node nodeWrapper ${selected ? 'selected' : ''}`}>
      {selected ? <DeleteNodeButton id={props.id} /> : undefined}
      <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div>
        <p className='characterLabel'>Character</p>

        {/* DROPPABLE */}
        <div ref={setNodeRef} style={{ width: `${chipKey ? 'min-content' : '25%'}`, height: `${chipKey ? 'min-content' : '25px'}`, border: '1px solid gray', borderRadius: '30px' }}>
          {chipKey && <ChipChip chipKey={chipKey} setKey={setKey} draggable={true} altID={nanoid()}></ChipChip>}
        </div>

        <Input id={props.id} dataKey={"character"} defaultText='Character' />
        <TextArea id={props.id} dataKey={"dialogue"} defaultText='Hi! How are you today?'></TextArea>
      </div>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable}>
      </Handle>
    </div>
  );
}

export default DialogueNode;
