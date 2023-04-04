export function add(u, v) {
  return u.map((ui, i) => ui + v[i]);
}

export function scale(k, u) {
  return u.map((ui) => k * ui);
}

export const Z = [0, 0];
export const N = [-1, 0];
export const E = [0, 1];
export const S = [1, 0];
export const W = [0, -1];
export const NE = add(N, E);
export const SE = add(S, E);
export const SW = add(S, W);
export const NW = add(N, W);

export const dirs4 = [N, E, S, W];
export const dirs5 = [...dirs4, Z];
export const dirs8 = [...dirs4, NE, SE, SW, NW];
export const dirs9 = [...dirs8, Z];

export const strToDir = { "^": N, ">": E, "v": S, "<": W };
