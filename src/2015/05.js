import { assert, assertFalse } from "std/testing/asserts.ts";
import { chunk } from "../array.js";

function isNice1(s) {
  return [...s.matchAll(/a|e|i|o|u/g)].length >= 3 &&
    chunk(2, 1, s).some(([a, b]) => a === b) &&
    !s.match(/ab|cd|pq|xy/);
}

function hasDoublePair(s) {
  for (let i = 0; i < s.length; i++) {
    if (s.slice(i + 2).includes(s.slice(i, i + 2))) {
      return true;
    }
  }
  return false;
}

function isNice2(s) {
  return hasDoublePair(s) && chunk(3, 1, s).some(([a, _, c]) => a === c);
}

export function part1(input) {
  return input.split("\n").filter((s) => isNice1(s)).length;
}

export function part2(input) {
  return input.split("\n").filter((s) => isNice2(s)).length;
}

export function test() {
  assert(isNice1("ugknbfddgicrmopn"));
  assert(isNice1("aaa"));
  assertFalse(isNice1("jchzalrnumimnmhp"));
  assertFalse(isNice1("haegwjzuvuyypxyu"));
  assertFalse(isNice1("dvszwmarrgswjxmb"));

  assert(isNice2("qjhvhtzxzqqjkmpb"));
  assert(isNice2("xxyxx"));
  assertFalse(isNice2("uurcxstgmygtbstg"));
  assertFalse(isNice2("ieodomkazucvgmuy"));
}
