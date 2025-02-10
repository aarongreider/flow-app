interface ButtonProps {
    selected: boolean,
    onSelect: () => void,
}

function SelectNodeButton(props: ButtonProps) {

    return (
        <>
            <button className="nodeButton nodrag nopan"
                style={{
                    right: '-22px',
                    backgroundColor: `${props.selected ? '#87BC83' : 'white'}`
                }}
                onClick={props.onSelect}
            >
                <div style={{ width: '5px', height: "5px", borderRadius: '50px', backgroundColor: `${props.selected ? 'white' : 'lightgrey'}` }}></div>
            </button>
            <div style={{ height: '65%', width: '25px', right: '-20px', top: '40px',/* background: 'red', */ position: "absolute", cursor: 'move' }}></div>
        </>)
}

export default SelectNodeButton