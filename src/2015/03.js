import { assertEquals } from "std/testing/asserts.ts";
import { chunk } from "../array.js";
import { add, strToDir, Z } from "../grid.js";

export function parse(input) {
  return [...input].map((c) => strToDir[c]);
}

function _part1(dirs) {
  let santa = Z;
  const visited = new Set([santa.toString()]);
  for (const dir of dirs) {
    santa = add(santa, dir);
    visited.add(santa.toString());
  }
  return visited;
}

export function part1(dirs) {
  return _part1(dirs).size;
}

export function part2(dirs) {
  return new Set([
    ..._part1(chunk(1, 2, dirs).flat()),
    ..._part1(chunk(1, 2, dirs.slice(1)).flat()),
  ]).size;
}

export function test() {
  assertEquals(part1(parse(">")), 2);
  assertEquals(part1(parse("^>v<")), 4);
  assertEquals(part1(parse("^v^v^v^v^v")), 2);

  assertEquals(part2(parse("^v")), 3);
  assertEquals(part2(parse("^>v<")), 3);
  assertEquals(part2(parse("^v^v^v^v^v")), 11);
}
