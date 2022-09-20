import {ReactNode, SVGProps} from "react";
import {zoom} from "./constants";

export const Svg = ({size, margin = 0, children, ...props}: SVGProps<SVGSVGElement> & { size: number, margin?: number, children: ReactNode }) => {
    const sizeWithMargins = size + margin * 2;

    return <svg
        {...props}
        xmlns={"http://www.w3.org/2000/svg"}
        width={zoom * sizeWithMargins}
        height={zoom * sizeWithMargins}
        viewBox={`${-margin} ${-margin} ${sizeWithMargins} ${sizeWithMargins}`}
    >
        {children}
    </svg>;
};
