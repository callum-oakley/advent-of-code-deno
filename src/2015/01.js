import { assertEquals } from "std/testing/asserts.ts";

export function part1(input) {
  let floor = 0;
  for (const c of input) {
    if (c === "(") {
      floor++;
    } else if (c === ")") {
      floor--;
    }
  }
  return floor;
}

export function part2(input) {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }
    if (floor < 0) {
      return i + 1;
    }
  }
}

export function test() {
  assertEquals(part1("(())"), 0);
  assertEquals(part1("()()"), 0);
  assertEquals(part1("((("), 3);
  assertEquals(part1("(()(()("), 3);
  assertEquals(part1("))((((("), 3);
  assertEquals(part1("())"), -1);
  assertEquals(part1("))("), -1);
  assertEquals(part1(")))"), -3);
  assertEquals(part1(")())())"), -3);

  assertEquals(part2(")"), 1);
  assertEquals(part2("()())"), 5);
}
