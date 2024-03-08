import { useCallback } from 'react';
import { Handle, Position, NodeProps, useNodes, useReactFlow } from 'reactflow';

const handleStyle = { left: 10 };

function TextUpdaterNode( props: NodeProps) {
  const nodes = useNodes();
  const reactFlowInstance = useReactFlow();


  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
    console.log(props.xPos)
    console.log(props.id)
    console.log(nodes)
    console.log(reactFlowInstance)
    console.log(reactFlowInstance.getNode('1'))
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div>
     
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <p>There are currently {nodes.length} nodes!</p>
      <p>x: {reactFlowInstance.getNode('1')?.position.x}  y: {reactFlowInstance.getNode('1')?.position.y}</p>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={props.isConnectable}
      />
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={props.isConnectable} />
    </div>
  );
}

export default TextUpdaterNode;
