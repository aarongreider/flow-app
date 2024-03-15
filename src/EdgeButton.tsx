import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from 'reactflow';


export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: any) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            width: '12px', height: '12px',
            background: 'white',
            fontSize: '10px',
            color: 'darkgray',
            padding: '0px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
          }} 
          className="nodrag nopan"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          <p style={{top:'-2px', position: "absolute", margin: "0"}}>-</p>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
