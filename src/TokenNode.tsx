import { Handle, Position, NodeProps } from 'reactflow';
import { useEffect, useState } from 'react';

import useStore from './store';
import Input from './Input';
import DeleteNodeButton from './DeleteNodeButton';
import SelectNodeButton from './SelectNodeButton';

function TokenNode(props: NodeProps) {
    const edges = useStore((state) => state.edges);
    const nodes = useStore((state) => state.nodes);

    const [selected, setSelected] = useState<boolean>(false)
    const [isBroadcasting, setIsBroadcasting] = useState<boolean | undefined>(undefined)
    const [hasKeyMatch, setHasKeyMatch] = useState<boolean>(false)
    const [inputChange, setInputChange] = useState<boolean>(false);



    useEffect(() => {
        // when a new connection is made to this node, reevaluate whether this token is broadcasting
        if (edges.find(edge => edge.source === props.id)) { // find matching source edge
            setIsBroadcasting(true)
        } else if (edges.find(edge => edge.target === props.id)) { // find matching target edge
            setIsBroadcasting(false)
        } else {
            setIsBroadcasting(undefined)
        }
    }, [edges])

    useEffect(() => {
        const currentNode = nodes.find(node => node.id === props.id)
        
        if (currentNode?.data.token) {
            const keyMatch = nodes.find(node => node.data.token === currentNode.data.token && node.id !== props.id)
            if (keyMatch) {
                setHasKeyMatch(true)
            } else {
                setHasKeyMatch(false)
            }
        }
    }, [inputChange])

    const onInputChange = () => {
        // TODO: somehow need to notify the specific token to change it's state on command
        setInputChange(!inputChange)
    }


    return (
        <div className={`token-node nodeWrapper ${selected ? 'selected' : ''}`}>
            {selected ? <DeleteNodeButton id={props.id} /> : undefined}
            <SelectNodeButton selected={selected} onSelect={() => setSelected(!selected)} />
            {isBroadcasting ? undefined :
                <Handle className="handle target" type="target" position={Position.Top} isConnectable={props.isConnectable} />
            }
            {hasKeyMatch ? <span style={{ color: 'white', paddingRight: '5px' }} className="material-symbols-outlined">kid_star</span> : undefined}
            <Input id={props.id} dataKey="token" defaultText='TokenKey' onChange={onInputChange}/>
            {isBroadcasting || isBroadcasting === undefined ?
                <Handle className="handle source" type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
                : undefined}
        </div>
    );
}

export default TokenNode;
