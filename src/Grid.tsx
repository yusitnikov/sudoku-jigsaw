import {fatLine, getHorizontalLineThickness, getVerticalLineThickness} from "./constants";
import {indexes} from "./utils";
import {Fragment} from "react";
import {getColor} from "./field";
import {Svg} from "./Svg";

export const Grid = () => <Svg
    size={10}
    margin={fatLine / 2}
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
</Svg>;
