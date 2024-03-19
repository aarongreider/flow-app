import { useState, useCallback, useEffect, useRef } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useStore from './store';

function SignalNode(props: NodeProps) {
  const nodes = useStore((state) => state.nodes);
  const updateNodeText = useStore((state) => state.updateNodeText);

  const [signalKey, setSignalKey] = useState(nodes.find(node => node.id === props.id)?.data?.signal ?? "SignalKey");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    updateNodeText(props.id, { response: signalKey })
  }, [signalKey])

  useEffect(() => {
    // resize text area
    console.log(inputRef.current)
    if (inputRef.current) {
      // We need to reset the height first to get the correct scrollHeight for the textarea
      inputRef.current.style.width = '0px'
      const { scrollWidth } = inputRef.current

      // Now we set the height directly
      inputRef.current.style.width = `${scrollWidth}px`
    }

  }, [inputRef, signalKey])

  const onChange = useCallback((evt: any) => {
    //console.log(reactFlowInstance.getNode(props.id))
    setSignalKey(evt.target.value)
  }, []);

  return (
    <div className="signal-node">
      <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <input ref={inputRef} id="signal" onChange={onChange} value={signalKey}></input>
      <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={props.isConnectable} />
    </div>
  );
}

export default SignalNode;
