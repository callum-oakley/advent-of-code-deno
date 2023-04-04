import { assertEquals } from "std/testing/asserts.ts";
import { crypto, toHashString } from "std/crypto/mod.ts";

async function md5(data) {
  return toHashString(
    await crypto.subtle.digest("MD5", new TextEncoder().encode(data)),
  );
}

async function partN(key, prefix) {
  for (let i = 1;; i++) {
    if ((await md5(key + i)).startsWith(prefix)) {
      return i;
    }
  }
}

export function part1(key) {
  return partN(key, "00000");
}

export function part2(key) {
  return partN(key, "000000");
}

export async function test() {
  assertEquals(await part1("abcdef"), 609043);
  assertEquals(await part1("pqrstuv"), 1048970);
}
