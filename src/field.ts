import {createRandomGenerator} from "./random";
import {indexes} from "./utils";

const field = `
4>9<3>1>0>2<6>8<5<7
V A A A V A A A A V
6<7>8>0>1>3<5<9<4<2
V V A A V A A A V A
0>2>9<5<7>6>1<4<3<8
V V V V A A V V V A
1>8<2>4>5<9<7<3<6<0
A A A V A V V A V A
3<5<6<7<8>4>0>2>9>1
A V A A V A V A A V
7>0>4>8>9>5>3<1>2<6
A A V V A A A V V A
2>3<5>6<4>1<8>0>7<9
V V A V A A A A A A
5>1>7>9>2>0<4<6<8<3
V A A V V V A A V A
9<4<1>3>6<8<2>7>0<5
V V A V V A V A A V
8<6>0<2>3<7>9<5>1>4
`.trim().split("\n");
export const getDigit = (x: number, y: number) => Number(field[y * 2][x * 2]);
export const normalizeDigit = (n: number) => n === 9 ? 6 : n;
export const getRightCoeff = (x: number, y: number) => (x === 0 || x === 10) ? 0 : (field[y * 2][x * 2 - 1] === ">" ? 1 : -1);
export const getDownCoeff = (x: number, y: number) => (y === 0 || y === 10) ? 0 : (field[y * 2 - 1][x * 2] === "V" ? 1 : -1);

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
export const getColor = (x: number, y: number) => colors[y][x] === "M" ? "#aaa" : "#fff";

export const allPieces = indexes(10).flatMap(y => indexes(10).map(x => {
    const n = getDigit(x, y);

    return {
        x,
        y,
        n,
        nn: normalizeDigit(n),
        c: getColor(x, y),
        a: 0,
        rnd: createRandomGenerator(x * 10 + y)(),
    };
}));

export const sortedPieces = [...allPieces].sort(
    (a, b) => a.c.localeCompare(b.c) || a.nn - b.nn || Math.sign(a.rnd - b.rnd) || a.x - b.x || a.y - b.y
);
