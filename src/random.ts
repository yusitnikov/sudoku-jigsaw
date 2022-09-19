export type RandomGenerator = () => number;

// "mulberry32" - see https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
export const createRandomGenerator = (seed: number): RandomGenerator => () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export const getDailyRandomGeneratorSeed = () => {
    const date = new Date();

    return date.getUTCFullYear() * 10000 + date.getUTCMonth() * 100 + date.getUTCDate();
};

export const shuffleArray = <T>(array: T[], random: RandomGenerator): T[] => {
    const shuffled = [...array];

    for (let i = 0; i < array.length; i++) {
        const i2 = i + Math.floor((array.length - i) * random());

        // Check just for safety
        if (i2 < array.length) {
            const t = shuffled[i];
            shuffled[i] = shuffled[i2];
            shuffled[i2] = t;
        }
    }

    return shuffled;
};
