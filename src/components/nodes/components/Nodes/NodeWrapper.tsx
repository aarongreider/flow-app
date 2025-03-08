import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { ReactNode, useState } from 'react';
import DeleteNodeButton from '../DeleteNodeButton';
import SelectNodeButton from '../SelectNodeButton';
import useStore from '../../../../store/store';
import { nanoid } from 'nanoid';
import { useDraggable } from '@dnd-kit/core';

interface props {
    nodeProps: NodeProps
    className: string
    children: ReactNode
    selected: boolean
    setSelected: (selected: boolean) => void
}

function NodeWrapper({ nodeProps, className, children, selected, setSelected }: props) {

    const nodes = useStore((state) => state.nodes);
    const setNodes = useStore((state) => state.setNodes);
    const clientXY = useStore((state) => state.clientXY);
    const reactFlowInstance = useReactFlow();

    const handleDuplicate = () => {
        console.log("duplicating!");

        const node = nodes.find(node => node.id === nodeProps.id);
        const data = node?.data

        const position = reactFlowInstance.screenToFlowPosition({
            x: clientXY.x,
            y: clientXY.y,
        })

        addNode(nodeProps.type, position.x, position.y, data)
    }

    const addNode = (type: string, xPos: number = 0, yPos: number = 100, data: any) => {
        setNodes([...nodes, { id: nanoid(), position: { x: xPos, y: yPos }, data: { ...data }, type: type }])
    }
    return (
        <div className={`${className} nodeWrapper ${selected ? 'selected' : ''}`} >
            {selected ? <DeleteNodeButton id={nodeProps.id} /> : undefined}
            <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} onDuplicate={handleDuplicate} />
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={nodeProps.isConnectable} />
            {children}
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={nodeProps.isConnectable} />
        </div>
    );
}

export default NodeWrapper;