import { useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useStore from './store';

function ResponseNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [response, setResponse] = useState(nodes.find(node => node.id === props.id)?.data?.response ?? "I'm good, thanks!");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateNodeText(props.id, { response: response })
  }, [response])

  useEffect(() => {
    // resize text area
    //console.log(inputRef.current)
    if (inputRef.current) {
      // We need to reset the height first to get the correct scrollHeight for the textarea
      inputRef.current.style.width = '0px'
      const { scrollWidth } = inputRef.current

      // Now we set the height directly
      inputRef.current.style.width = `${scrollWidth}px`
    }

  }, [inputRef, response])

  const onChange = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setResponse(evt.target.value)
  }, []);

  return (
    <div className="response-node">
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <input ref={inputRef} id="response" onChange={onChange} value={response}></input>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default ResponseNode;
