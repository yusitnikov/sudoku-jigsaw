import {Fragment, ReactNode, useMemo, useRef} from "react";
import {createRandomGenerator, shuffleArray} from "./random";

const indexes = (n: number) => [...Array(n).keys()];

// region Field definition
const field = `
4>9<3>1>0>2<6>8<5<7
V A A A V A A A A V
6<7>8>0>1>3<5<9>4<2
V V A A V A A A A A
0>2>9<5<7>6>1<4<3<8
V V V V A A V V A A
1>8<2>4>5<9<7<3<6<0
A A A V A V V A V A
3<5<6<7<8>4>0>2>9>1
A V A A V A V A A V
7>0>4>8>9>5>3<1>2<6
A A V V A A A V V A
2>3<5<6>4>1<8>0>7<9
V V A V A A A A A A
5>1>7<9<2>0<4<6<8>3
V A A V V V V A V A
9<4<1<3>6<8<2>7>0<5
V V A V V A V A A V
8<6>0<2>3<7>9<5>1>4
`.trim().split("\n");
const getDigit = (x: number, y: number) => Number(field[y * 2][x * 2]);
const normalizeDigit = (n: number) => n === 9 ? 6 : n;
const getRightCoeff = (x: number, y: number) => (x === 0 || x === 10) ? 0 : (field[y * 2][x * 2 - 1] === ">" ? 1 : -1);
const getDownCoeff = (x: number, y: number) => (y === 0 || y === 10) ? 0 : (field[y * 2 - 1][x * 2] === "V" ? 1 : -1);

const colors = `
MM    MM
M      MM
    M  MMM
       MMM
      MMMM
    MMMMMM
   MMMMMMM
   MM MMMM
M  MMMMMM
MM  MMMM
`.trim().split("\n");
const getColor = (x: number, y: number) => colors[y][x] === "M" ? "#aaa" : "#fff";

const allPieces = indexes(10).flatMap(x => indexes(10).map(y => {
    const n = getDigit(x, y);

    return {
        x,
        y,
        n,
        nn: normalizeDigit(n),
        c: getColor(x, y),
        a: n === 9 ? 180 : 0,
        rnd: createRandomGenerator(x * 10 + y)(),
    };
}));

const sortedPieces = [...allPieces].sort((a, b) => a.c.localeCompare(b.c) || a.nn - b.nn || Math.sign(a.rnd - b.rnd) || a.x - b.x || a.y - b.y);
// endregion

const thinLine = 0.06;
const fatLine = 0.2;
const getHorizontalLineThickness = (y: number) => y % 5 ? thinLine : fatLine;
const getVerticalLineThickness = (x: number) => x % 2 ? thinLine : fatLine;

const width = 0.2;
const height = 0.2;

const SvgWithDownload = ({size, margin = 0, fileName, children}: { size: number, margin?: number, fileName: string, children: ReactNode }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const sizeWithMargins = size + margin * 2;

    return <div style={{
        display: "inline-block",
        margin: "1em",
        verticalAlign: "top",
        fontFamily: "Arial",
    }}>
        <div>
            {fileName} (<a
                href={`data:png/image;base64,${btoa(svgRef.current?.outerHTML ?? "")}`}
                download={`${fileName}.svg`}
            >
                download image
            </a>)
        </div>

        <div>
            <svg
                ref={svgRef}
                xmlns={"http://www.w3.org/2000/svg"}
                width={60 * sizeWithMargins}
                height={60 * sizeWithMargins}
                viewBox={`${-margin} ${-margin} ${sizeWithMargins} ${sizeWithMargins}`}
            >
                {children}
            </svg>
        </div>
    </div>;
};

const digitDefs = <defs>
    <ellipse
        id={"digit0"}
        cx={0.5}
        cy={0.5}
        rx={0.15}
        ry={0.25}
    />

    <path
        id={"digit1"}
        d={[
            "M 0.55 0.75",
            "V 0.25",
            "h -0.01",
            "Q 0.5 0.35 0.4 0.4"
        ].join(" ")}
    />

    <path
        id={"digit2"}
        d={[
            "M 0.36 0.35",
            "Q 0.4 0.25 0.5 0.25",
            "Q 0.65 0.25 0.65 0.375",
            "Q 0.65 0.45 0.45 0.6",
            "Q 0.35 0.675 0.35 0.75",
            "H 0.65",
        ].join(" ")}
    />

    <path
        id={"digit3"}
        d={[
            "M 0.36 0.35",
            "Q 0.4 0.25 0.5 0.25",
            "Q 0.65 0.25 0.65 0.375",
            "Q 0.65 0.5 0.52 0.5",
            "Q 0.65 0.5 0.65 0.625",
            "Q 0.65 0.75 0.5 0.75",
            "Q 0.4 0.75 0.36 0.65",
        ].join(" ")}
    />

    <path
        id={"digit4"}
        d={[
            "M 0.6 0.75",
            "V 0.25",
            "h -0.05",
            "L 0.35 0.55",
            "v 0.05",
            "H 0.65",
        ].join(" ")}
    />

    <path
        id={"digit5"}
        d={[
            "M 0.36 0.65",
            "Q 0.4 0.75 0.5 0.75",
            "Q 0.65 0.75 0.65 0.6",
            "T 0.5 0.45",
            "Q 0.4 0.45 0.37 0.5",
            "L 0.4 0.25",
            "H 0.63",
        ].join(" ")}
    />

    <path
        id={"digit6"}
        d={[
            "M 0.35 0.6",
            "Q 0.35 0.45 0.5 0.45",
            "T 0.65 0.6",
            "T 0.5 0.75",
            "T 0.35 0.6",
            "Q 0.35 0.25 0.6 0.25",
        ].join(" ")}
    />

    <path
        id={"digit7"}
        d={[
            "M 0.35 0.25",
            "H 0.65",
            "v 0.01",
            "Q 0.45 0.5 0.45 0.75",
        ].join(" ")}
    />

    <path
        id={"digit8"}
        d={[
            "M 0.63 0.35",
            "Q 0.63 0.25 0.5 0.25",
            "T 0.37 0.35",
            "Q 0.37 0.45 0.5 0.5",
            "T 0.63 0.65",
            "Q 0.63 0.75 0.5 0.75",
            "T 0.37 0.65",
            "Q 0.37 0.55 0.5 0.5",
            "T 0.63 0.35",
            "Z"
        ].join(" ")}
    />

    <path
        id={"digit9"}
        d={[
            "M 0.65 0.4",
            "Q 0.65 0.55 0.5 0.55",
            "T 0.35 0.4",
            "T 0.5 0.25",
            "T 0.65 0.4",
            "Q 0.65 0.75 0.4 0.75",
        ].join(" ")}
    />
</defs>;

export const App = () => {
    const randomSeed = 0;

    const shuffledPieces = useMemo(() => {
        const random = createRandomGenerator(randomSeed);

        return shuffleArray(allPieces, random)
            .map(value => ({
                ...value,
                a: [0, 6, 8, 9].includes(value.n) && random() < 0.5 ? 180 : 0,
            }));
    }, [randomSeed]);

    const sortedPiecesWithShuffledAngle = useMemo(() => {
        const random = createRandomGenerator(randomSeed);

        return sortedPieces.map(value => [0, 8].includes(value.n) ? {
            ...value,
            a: random() < 0.5 ? 180 : 0,
        } : value);
    }, [randomSeed]);

    return <>
        <SvgWithDownload
            size={10}
            margin={fatLine / 2}
            fileName={"Jigsaw grid"}
        >
            {indexes(10).map(y => <Fragment key={`row${y}`}>
                {indexes(10).map(x => <rect
                    key={x}
                    x={x}
                    y={y}
                    width={1}
                    height={1}
                    fill={getColor(x, y)}
                    strokeWidth={0}
                />)}
            </Fragment>)}

            {indexes(11).map(i => <Fragment key={`line${i}`}>
                <line x1={-fatLine / 2} x2={10 + fatLine / 2} y1={i} y2={i} stroke={"black"} strokeWidth={getHorizontalLineThickness(i)}/>
                <line x1={i} x2={i} y1={-fatLine / 2} y2={10 + fatLine / 2} stroke={"black"} strokeWidth={getVerticalLineThickness(i)}/>
            </Fragment>)}
        </SvgWithDownload>

        <Pieces
            fileName={"Jigsaw pieces, shuffled"}
            pieces={shuffledPieces}
        />

        <Pieces
            fileName={"Jigsaw pieces, sorted"}
            pieces={sortedPiecesWithShuffledAngle}
        />
    </>;
};

export const Pieces = ({fileName, pieces}: {fileName: string, pieces: typeof allPieces}) => <SvgWithDownload
    size={15}
    margin={height}
    fileName={fileName}
>
    {digitDefs}

    {pieces.map(({x, y, n, a}, i) => <Piece
        key={`piece${i}`}
        x={x}
        y={y}
        positionX={(i % 10) * 1.5}
        positionY={Math.floor(i / 10) * 1.5}
        angle={a}
    />)}
</SvgWithDownload>;

export const Piece = ({x, y, positionX, positionY, angle}: {x: number, y: number, positionX: number, positionY: number, angle: number}) => <g
    transform={`translate(${positionX} ${positionY}) translate(0.5 0.5) rotate(${angle}) translate(-0.5 -0.5)`}
>
    <defs>
        <path
            id={`cell${x}_${y}`}
            d={[
                "M 0 0",

                `L ${0.5 - width} 0`,
                `L 0.5 ${height * getDownCoeff(x, y)}`,
                `L ${0.5 + width} 0`,
                "L 1 0",

                `L 1 ${0.5 - width}`,
                `L ${1 + height * getRightCoeff(x + 1, y)} 0.5`,
                `L 1 ${0.5 + width}`,
                "L 1 1",

                `L ${0.5 + width} 1`,
                `L 0.5 ${1 + height * getDownCoeff(x, y + 1)}`,
                `L ${0.5 - width} 1`,
                "L 0 1",

                `L 0 ${0.5 + width}`,
                `L ${height * getRightCoeff(x, y)} 0.5`,
                `L 0 ${0.5 - width}`,
                "Z",
            ].join(" ")}
            fill={getColor(x, y)}
            stroke={"black"}
            strokeWidth={thinLine / 4}
        />

        <clipPath id={`clip${x}_${y}`}>
            <use href={`#cell${x}_${y}`}/>
        </clipPath>
    </defs>

    <use href={`#cell${x}_${y}`}/>

    <g clipPath={`url(#clip${x}_${y})`}>
        <line x1={0} x2={1} y1={0} y2={0} stroke={"black"} strokeWidth={getHorizontalLineThickness(y)}/>
        <line x1={0} x2={1} y1={1} y2={1} stroke={"black"} strokeWidth={getHorizontalLineThickness(y + 1)}/>
        <line x1={0} x2={0} y1={0} y2={1} stroke={"black"} strokeWidth={getVerticalLineThickness(x)}/>
        <line x1={1} x2={1} y1={0} y2={1} stroke={"black"} strokeWidth={getVerticalLineThickness(x + 1)}/>

        <use
            href={`#digit${getDigit(x, y)}`}
            fill={"none"}
            stroke={"black"}
            strokeWidth={thinLine}
            strokeLinecap={"square"}
            strokeLinejoin={"miter"}
        />
    </g>
</g>;
