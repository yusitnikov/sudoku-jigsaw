import {ReactNode, useLayoutEffect, useRef, useState} from "react";

export const WithDownload = ({fileName, children}: { fileName: string, children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [innerHTML, setInnerHTML] = useState("");
    useLayoutEffect(() => setInnerHTML(ref.current!.innerHTML), []);

    return <div style={{
        display: "inline-block",
        margin: "1em",
        verticalAlign: "top",
    }}>
        <div>
            {fileName} (<a
                href={`data:png/image;base64,${btoa(innerHTML)}`}
                download={`${fileName}.svg`}
            >
                download
            </a>)
        </div>

        <div ref={ref}>
            {children}
        </div>
    </div>;
};
