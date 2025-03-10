import { Handle, NodeProps, Position, useReactFlow } from 'reactflow';
import { ReactNode, useCallback } from 'react';
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
    const setNodes = useStore((state) => state.setNodes);

    const clientXY = useStore((state) => state.clientXY);

    const selectedNodes = useStore((state) => state.selectedNodes);
    const toggleSelectedNode = useStore((state) => state.toggleSelectedNode);

    const reactFlowInstance = useReactFlow();

    const isSelected = useCallback((): boolean => {
        return selectedNodes.includes(nodeProps.id)
    }, [selectedNodes])

    const selected: boolean = isSelected();



    const handleDuplicate = () => {
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
    return <>
        {selected ? <DeleteNodeButton id={nodeProps.id} /> : undefined}
        <div className={`${className} nodeWrapper ${selected ? 'selected' : ''}`} >
            {selected ? <DeleteNodeButton id={nodeProps.id} /> : undefined}
            <SelectNodeButton id={nodeProps.id} selected={selected} onDuplicate={handleDuplicate} />
            <Handle className="handle target" type="target" position={Position.Top} isConnectable={nodeProps.isConnectable} />
            {children}
            <Handle className="handle source" type="source" position={Position.Bottom} id="a" isConnectable={nodeProps.isConnectable} />
        </div>

    </>
}

export default NodeWrapper;