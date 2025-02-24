import { Handle, NodeProps, Position } from 'reactflow';
import { ReactNode } from 'react';
import DeleteNodeButton from '../DeleteNodeButton';
import SelectNodeButton from '../SelectNodeButton';

interface props {
    nodeProps: NodeProps
    className: string
    children: ReactNode
    selected: boolean
    setSelected: (selected: boolean) => void
}

function NodeWrapper({ nodeProps, className, children, selected, setSelected }: props) {

    return (
        <div className={`${className} nodeWrapper ${selected ? 'selected' : ''}`}>
            {selected ? <DeleteNodeButton id={nodeProps.id} /> : undefined}
            <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={nodeProps.isConnectable} />
            {children}
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={nodeProps.isConnectable} />
        </div>
    );
}

export default NodeWrapper;