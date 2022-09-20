import {usePieces} from "./usePieces";
import {Grid} from "./Grid";
import {DraggablePiece} from "./Piece";
import {zoom} from "./constants";

export const PlayRoute = () => {
    const pieces = usePieces(false);

    return <div style={{position: "relative"}}>
        <div style={{padding: zoom * 4, opacity: 0.5}}>
            <Grid/>
        </div>

        {pieces.map((piece, i) => <DraggablePiece
            key={`piece${i}`}
            i={i}
            {...piece}
        />)}
    </div>;
};
