import {useMemo} from "react";
import {createRandomGenerator, shuffleArray} from "./random";
import {allPieces, sortedPieces} from "./field";

export const usePieces = (shuffle: boolean) => {
    const randomSeed = 0;

    return useMemo(() => {
        const random = createRandomGenerator(randomSeed);

        return shuffle
            ? shuffleArray(allPieces, random)
                .map(value => ({
                    ...value,
                    a: [0, 6, 8, 9].includes(value.n) && random() < 0.5 ? 180 : 0,
                }))
            : sortedPieces.map(value => ({
                ...value,
                a: value.n === 9 ? 180 : [0, 8].includes(value.n) ? (random() < 0.5 ? 180 : 0) : 0,
            }));
    }, [shuffle, randomSeed]);
};
