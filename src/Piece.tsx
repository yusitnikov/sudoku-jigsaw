import {
    fatLine,
    getHorizontalLineThickness,
    getVerticalLineThickness,
    height,
    thinLine,
    width,
    zoom
} from "./constants";
import {allPieces, getColor, getDigit, getDownCoeff, getRightCoeff} from "./field";
import {indexes} from "./utils";
import Draggable from "react-draggable";
import {Svg} from "./Svg";
import {useState} from "react";

export const digitSvgs = [
    <ellipse
        cx={0.5}
        cy={0.5}
        rx={0.15}
        ry={0.25}
    />,
    <path
        d={[
            "M 0.55 0.75",
            "V 0.25",
            "h -0.01",
            "Q 0.5 0.35 0.4 0.4"
        ].join(" ")}
    />,
    <path
        d={[
            "M 0.36 0.35",
            "Q 0.4 0.25 0.5 0.25",
            "Q 0.65 0.25 0.65 0.375",
            "Q 0.65 0.45 0.45 0.6",
            "Q 0.35 0.675 0.35 0.75",
            "H 0.65",
        ].join(" ")}
    />,
    <path
        d={[
            "M 0.36 0.35",
            "Q 0.4 0.25 0.5 0.25",
            "Q 0.65 0.25 0.65 0.375",
            "Q 0.65 0.5 0.52 0.5",
            "Q 0.65 0.5 0.65 0.625",
            "Q 0.65 0.75 0.5 0.75",
            "Q 0.4 0.75 0.36 0.65",
        ].join(" ")}
    />,
    <path
        d={[
            "M 0.6 0.75",
            "V 0.25",
            "h -0.05",
            "L 0.35 0.55",
            "v 0.05",
            "H 0.65",
        ].join(" ")}
    />,
    <path
        d={[
            "M 0.36 0.65",
            "Q 0.4 0.75 0.5 0.75",
            "Q 0.65 0.75 0.65 0.6",
            "T 0.5 0.45",
            "Q 0.4 0.45 0.37 0.5",
            "L 0.4 0.25",
            "H 0.63",
        ].join(" ")}
    />,
    <path
        d={[
            "M 0.35 0.6",
            "Q 0.35 0.45 0.5 0.45",
            "T 0.65 0.6",
            "T 0.5 0.75",
            "T 0.35 0.6",
            "Q 0.35 0.25 0.6 0.25",
        ].join(" ")}
    />,
    <path
        d={[
            "M 0.35 0.25",
            "H 0.65",
            "v 0.01",
            "Q 0.45 0.5 0.45 0.75",
        ].join(" ")}
    />,
    <path
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
    />,
    <path
        d={[
            "M 0.65 0.4",
            "Q 0.65 0.55 0.5 0.55",
            "T 0.35 0.4",
            "T 0.5 0.25",
            "T 0.65 0.4",
            "Q 0.65 0.75 0.4 0.75",
        ].join(" ")}
    />,
].map(el => ({
    ...el,
    props: {
        ...el.props,
        fill: "none",
        stroke: "black",
        strokeWidth: thinLine,
        strokeLinecap: "square",
        strokeLinejoin: "miter",
    }
}));

export const digitDefs = <defs>
    {indexes(10).map(i => ({
        ...digitSvgs[i],
        key: i,
        props: {
            ...digitSvgs[i].props,
            id: `digit${i}`
        },
    }))}
</defs>;

export interface PiecePosition {
    positionX?: number;
    positionY?: number;
    angle?: number;
}

export const Piece = ({x, y, positionX = 0, positionY = 0, angle = 0, useRef}: PiecePosition & {x: number, y: number, useRef?: boolean}) => <g
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

        {useRef && <use href={`#digit${getDigit(x, y)}`}/>}
        {!useRef && digitSvgs[getDigit(x, y)]}
    </g>
</g>;

export const DraggablePiece = (
    {
        x,
        y,
        a,
        n,
        positionX = 0,
        positionY = 0,
        angle = 0,
        zIndex,
        onChange,
        animate,
    }: typeof allPieces[0] & PiecePosition & {
        zIndex: number,
        onChange: (changes: {x?: number, y?: number, a?: number, z?: boolean}) => void,
        animate: boolean,
    }
) => {
    const [isDragging, setIsDragging] = useState(false);

    return <Draggable
        position={{x: positionX, y: positionY}}
        onStart={() => onChange({z: true})}
        onDrag={() => setIsDragging(true)}
        onStop={(_, {x, y}) => {
            if (!isDragging && [0, 6, 8, 9].includes(n)) {
                onChange({a: angle + 180});
            }
            setIsDragging(false);

            const margin = zoom * (4 + fatLine / 2 - height);
            x -= margin;
            y -= margin;
            x /= zoom;
            y /= zoom;
            const xDiff = Math.abs(Math.abs(x) % 1 - 0.5);
            const yDiff = Math.abs(Math.abs(y) % 1 - 0.5);
            if (x > -0.5 && x < 9.5 && y > -0.5 && y < 9.5 && xDiff > 0.3 && yDiff > 0.3) {
                x = Math.round(x);
                y = Math.round(y);
            }
            x *= zoom;
            y *= zoom;
            x += margin;
            y += margin;
            onChange({x, y});
        }}
    >
        <span style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex,
        }}>
            <Svg
                size={1}
                margin={height}
                style={{
                    transform: `rotate(${a + angle}deg)`,
                    transition: animate ? "transform 0.3s" : undefined,
                    cursor: "pointer",
                }}
            >
                <Piece x={x} y={y}/>
            </Svg>
        </span>
    </Draggable>;
};
