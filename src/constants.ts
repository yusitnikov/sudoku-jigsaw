export const zoom = 60;

export const thinLine = 0.06;
export const fatLine = 0.2;
export const getHorizontalLineThickness = (y: number) => y % 5 ? thinLine : fatLine;
export const getVerticalLineThickness = (x: number) => x % 2 ? thinLine : fatLine;

export const width = 0.2;
export const height = 0.2;
