import {usePieces} from "./usePieces";
import {Grid} from "./Grid";
import {DraggablePiece} from "./Piece";
import {zoom} from "./constants";
import {useMemo} from "react";
import {useLocalStorage} from "./useLocalStorage";
import {useWindowSize} from "./useWindowSize";

export const PlayRoute = () => {
    const pieces = usePieces(false);

    const {isPortrait} = useWindowSize();

    const defaultPositions = useMemo(() => pieces.map((_, i) => ({
        x: ((i % 10) * 1.5 + (isPortrait ? 0 : 18)) * zoom,
        y: (Math.floor(i / 10) * 1.5 + (isPortrait ? 18 : 0)) * zoom,
        a: 0,
        z: 1,
    })), [pieces, isPortrait]);
    const [positions, setPositions, resetPositions] = useLocalStorage("positions", defaultPositions);

    const maxZIndex = useMemo(() => Math.max(...positions.map(({z}) => z)), [positions]);

    return <div style={{position: "relative"}}>
        <div style={{position: "absolute", margin: "0.5em", zIndex: maxZIndex + 1}}>
            <button type={"button"} onClick={resetPositions}>Reset</button>
        </div>

        <div style={{padding: zoom * 4, opacity: 0.5}}>
            <Grid/>
        </div>

        {pieces.map((piece, i) => {
            const {x, y, a, z} = positions[i];

            return <DraggablePiece
                key={`piece${i}`}
                {...piece}
                positionX={x}
                positionY={y}
                angle={a}
                zIndex={z}
            onChange={({z, ...positionUpdates}) => setPositions(positions => [
                    ...positions.slice(0, i),
                    {
                        ...positions[i],
                        ...positionUpdates,
                        ...(z ? {z: maxZIndex + 1} : {}),
                    },
                    ...positions.slice(i + 1),
                ])}
            />;
        })}
    </div>;
};
