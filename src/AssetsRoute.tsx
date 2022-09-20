import {usePieces} from "./usePieces";
import {WithDownload} from "./WithDownload";
import {Grid} from "./Grid";
import {allPieces} from "./field";
import {Svg} from "./Svg";
import {height} from "./constants";
import {digitDefs, Piece} from "./Piece";

export const AssetsRoute = () => {
    const shuffledPieces = usePieces(true);
    const sortedPieces = usePieces(false);

    return <>
        <WithDownload fileName={"Jigsaw grid"}>
            <Grid/>
        </WithDownload>

        {/*<WithDownload fileName={"Jigsaw pieces, original"}>*/}
        {/*    <Pieces pieces={allPieces}/>*/}
        {/*</WithDownload>*/}

        <WithDownload fileName={"Jigsaw pieces, shuffled"}>
            <Pieces pieces={shuffledPieces} coeff={1.5}/>
        </WithDownload>

        <WithDownload fileName={"Jigsaw pieces, sorted"}>
            <Pieces pieces={sortedPieces} coeff={1.5}/>
        </WithDownload>
    </>;
};

export const Pieces = ({pieces, coeff = 1}: {pieces: typeof allPieces, coeff?: number}) => <Svg
    size={10 * coeff}
    margin={height}
>
    {digitDefs}

    {pieces.map(({x, y, n, a}, i) => <Piece
        key={`piece${i}`}
        x={x}
        y={y}
        positionX={(i % 10) * coeff}
        positionY={Math.floor(i / 10) * coeff}
        angle={a}
        useRef={true}
    />)}
</Svg>;
