import { assertEquals } from "std/testing/asserts.ts";
import { chunk } from "../array.js";

export function parse(input) {
  return chunk(3, [...input.matchAll(/\d+/g)].map((n) => parseInt(n)))
    .map((present) => present.sort((a, b) => a - b));
}

function partN(resource, presents) {
  return presents.map(resource).reduce((a, b) => a + b);
}

export function part1(presents) {
  return partN(([x, y, z]) => 3 * x * y + 2 * y * z + 2 * z * x, presents);
}

export function part2(presents) {
  return partN(([x, y, z]) => 2 * x + 2 * y + x * y * z, presents);
}

export function test() {
  assertEquals(part1(parse("2x3x4")), 58);
  assertEquals(part1(parse("1x1x10")), 43);

  assertEquals(part2(parse("2x3x4")), 34);
  assertEquals(part2(parse("1x1x10")), 14);
}
