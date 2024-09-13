import useStore from '../store';

interface ButtonProps {
    id: string
}

function DeleteNodeButton(props: ButtonProps) {
    const setNodes = useStore((state) => state.setNodes);
    const nodes = useStore((state) => state.nodes);

    const removeNode = (id: string) => {
        const newNodes = nodes.filter(node => node.id !== id)
        setNodes([...newNodes])
    }

    return (
        <>
            <button className="nodeButton nodrag nopan"
                style={{
                    left: '-22px',
                }}
                onClick={() => {
                    removeNode(props.id)
                }}
            >
                <div style={{ width: '5px', height: "2.25px", backgroundColor: 'lightgrey' }}></div>
            </button>
        </>)
}

export default DeleteNodeButton