import { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import TextArea from './TextArea';
import Input from './Input';
import useStore from './store';

function DialogueNode(props: NodeProps) {
  const [selected, setSelected] = useState<boolean>(false)

  const toggleSelected = (bool?: boolean) => {
    bool = bool ?? !selected;
    setSelected(bool)
  }

  const setNodes = useStore((state) => state.setNodes);
  const nodes = useStore((state) => state.nodes);
  const removeNode = (id: string) => {
    const newNodes = nodes.filter(node => node.id !== id)
    setNodes([...newNodes])
  }

  return (
    <div className={`dialogue-node nodeWrapper ${selected ? 'selected' : ''}`}>
      <button className="nodeButton nodrag nopan"
        style={{
          display: `${selected ? 'flex' : 'none'}`,
          left: '-22px',
        }}
        onClick={() => {
          removeNode(props.id)
        }}
      >
        <div style={{ width: '5px', height: "2.25px", backgroundColor: 'lightgrey' }}></div>
      </button>
      <button className="nodeButton nodrag nopan"
        style={{
          right: '-22px',
          backgroundColor: `${selected ? '#87BC83' : 'white'}`
        }}
        onClick={() => {
          toggleSelected()
        }}
      >
        <div style={{ width: '5px', height: "5px", borderRadius: '50px', backgroundColor: `${selected ? 'white' : 'lightgrey'}` }}></div>
      </button>
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} /* style={{ top: '-15px' }} */ />
      <div>
        <p className='characterLabel'>Character</p>
        <Input id={props.id} dataKey={"character"} defaultText='Mumbo Jumbo' />
        <TextArea id={props.id} dataKey={"dialogue"} defaultText='Hi! How are you today?'></TextArea>
      </div>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default DialogueNode;
