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
      <BaseEdge id={id} path={edgePath} /* style={{ stroke: 'blue' }} */ />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute', transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="deleteEdgeButton nodrag nopan"
          onClick={() => {
            setEdges((es) => es.filter((e) => e.id !== id));
          }}
        >
          {/* <p style={{ top: '-2px', position: "absolute", margin: "0" }}>-</p> */}
          <div style={{ width: '5px', height: "2.25px", backgroundColor: 'white' }}></div>
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
