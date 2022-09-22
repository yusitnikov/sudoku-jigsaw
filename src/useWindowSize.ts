import {useEffect, useState} from "react";

const getWindowSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
    isPortrait: window.innerWidth < window.innerHeight,
});

export const useWindowSize = () => {
    const [size, setSize] = useState(getWindowSize);

    useEffect(() => {
        const handler = () => setSize(getWindowSize);
        window.addEventListener("resize", handler);
        window.addEventListener("orientationchange", handler);
        return () => {
            window.removeEventListener("resize", handler);
            window.removeEventListener("orientationchange", handler);
        };
    }, []);

    return size;
};
