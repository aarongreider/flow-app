import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import DeleteNodeButton from '../DeleteNodeButton';
import SelectNodeButton from '../SelectNodeButton';
import useStore from '../../../../store/store';
import { nanoid } from 'nanoid';

interface props {
    nodeProps: NodeProps
    className: string
    children: ReactNode
}

function NodeWrapper({ nodeProps, className, children }: props) {

    const nodes = useStore((state) => state.nodes);
    const getNode = useStore((state) => state.getNode);
    const setNodes = useStore((state) => state.setNodes);
    const appendNodes = useStore((state) => state.appendNodes);
    const isNodeSelected = useStore((state) => state.isNodeSelected);
    const [selected, setSelected] = useState(isNodeSelected(nodeProps.id))

    const clientXY = useStore((state) => state.clientXY);
    const reactFlowInstance = useReactFlow();

    useEffect(() => {
        setSelected(isNodeSelected(nodeProps.id))
    }, [nodes])


    const handleDuplicate = () => {
        const node = getNode(nodeProps.id)

        const position = reactFlowInstance.screenToFlowPosition({
            x: clientXY.x,
            y: clientXY.y,
        })

        //addNode(nodeProps.type, position.x, position.y, data)
        node && appendNodes([{ ...node, position: { x: position.x, y: position.y } }])
    }

    return <>
        {selected ? <DeleteNodeButton id={nodeProps.id} /> : undefined}
        <div className={`${className} nodeWrapper ${selected ? 'selected' : ''}`} title={JSON.stringify(nodeProps)}>
            {selected ? <DeleteNodeButton id={nodeProps.id} /> : undefined}
            <SelectNodeButton id={nodeProps.id} selected={selected} onDuplicate={handleDuplicate} />
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={nodeProps.isConnectable} />
            {children}
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={nodeProps.isConnectable} />
        </div>

    </>
}

export default NodeWrapper;