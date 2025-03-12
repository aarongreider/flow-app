import { useEffect, useState } from 'react';
import { NodeProps } from 'reactflow';
import TextArea from '../TextArea';
import Input from '../Input'
import { useDroppable } from '@dnd-kit/core';
import useStore from '../../../../store/store';
import { Node } from 'reactflow';
import { ChipItem } from '../../../Chip Dashboard/Chip';
import { nanoid } from 'nanoid';
import NodeWrapper from './NodeWrapper';

function DialogueNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const deleteNodeData = useStore((state) => state.deleteNodeData);
  const getNode = useStore((state) => state.getNode);

  const [setKey, setSetKey] = useState<string>()
  const [chipKey, setChipKey] = useState<string>()

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
    } else {
      setChipKey(undefined)
      setSetKey(undefined)
    }
  }, [nodes])

  const handleDeleteChip = () => {
    // find node in store and remove node
    deleteNodeData(props.id, { [`chipKey`]: '' })
    deleteNodeData(props.id, { [`setKey`]: '' })
  }


  return (
    <NodeWrapper nodeProps={props} className='dialogue-node'>
      <div className='inner'>
        {/* DROPPABLE */}
        <div ref={setNodeRef} style={{ marginTop: `${chipKey ? 0 : '-10px'}`, display: 'flex', alignItems: 'center', gap: '4px' }}>
          {(chipKey && setKey) && <ChipItem chipKey={chipKey} setKey={setKey} draggable={false} altID={nanoid()}></ChipItem>}
          {/* DELETE CHIP */}
          {chipKey ? <span className="material-symbols-outlined chip" style={{ paddingRight: '4px' }} onClick={handleDeleteChip}>delete</span> : undefined}
          {chipKey ? undefined : <Input id={props.id} dataKey={"character"} defaultText='Character' />}
        </div>
        <TextArea id={props.id} dataKey={"dialogue"} defaultText='Hi! How are you today?'></TextArea>
      </div>
    </NodeWrapper>
  );
}

export default DialogueNode;
