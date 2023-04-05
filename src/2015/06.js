export function parse(input) {
  const instructions = [];
  for (
    const match of input.matchAll(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/g,
    )
  ) {
    instructions.push([match[1], ...match.slice(2).map((s) => parseInt(s))]);
  }
  return instructions;
}

function partN(update, instructions) {
  const lights = new Array(1000 * 1000).fill(0);
  for (const [op, x0, y0, x1, y1] of instructions) {
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const hash = 1000 * y + x;
        lights[hash] = update(op, lights[hash]);
      }
    }
  }
  return lights.reduce((a, b) => a + b);
}

export function part1(instructions) {
  return partN(
    (op, light) => op === "turn off" || op === "toggle" && light ? 0 : 1,
    instructions,
  );
}

export function part2(instructions) {
  return partN(
    (op, light) =>
      Math.max(0, light + (op === "turn off" ? -1 : op === "turn on" ? 1 : 2)),
    instructions,
  );
}
