import * as fs from "std/fs/mod.ts";

const root = new URL(import.meta.resolve("./..")).pathname;

function years() {
  const res = [];
  for (const f of Deno.readDirSync(`${root}/src`)) {
    if (/^\d{4}$/.test(f.name)) {
      res.push(f.name);
    }
  }
  return res.sort();
}

function days(year) {
  const res = [];
  for (const f of Deno.readDirSync(`${root}/src/${year}`)) {
    if (/^\d{2}\.js$/.test(f.name)) {
      res.push(f.name.slice(0, 2));
    }
  }
  return res.sort();
}

async function fetchAoc(year, day, suffix = "") {
  const res = await fetch(
    `https://adventofcode.com/${year}/day/${parseInt(day)}${suffix}`,
    {
      headers: {
        cookie: `session=${Deno.readTextFileSync(`${root}/.session`)}`,
      },
    },
  );
  const text = await res.text();
  if (res.status !== 200) {
    throw new Error(text);
  }
  return text;
}

async function getInput(year, day) {
  const path = `${root}/input/${year}/${day}`;
  if (fs.existsSync(path)) {
    return Deno.readTextFileSync(path);
  }
  const input = await fetchAoc(year, day, "/input");
  fs.ensureFileSync(path);
  Deno.writeTextFileSync(path, input);
  return input;
}

async function getAnswer(year, day, part) {
  const path = `${root}/answers/${year}/${day}/${part}`;
  if (fs.existsSync(path)) {
    return Deno.readTextFileSync(path);
  }
  const page = await fetchAoc(year, day);
  const answers = [...page.matchAll(
    /Your puzzle answer was <code>([^<]+)<\/code>\./g,
  )];
  if (answers.length < part) {
    throw Error(`Can't fetch answer for ${year}.${day}.${part}`);
  }
  const answer = answers[part - 1][1];
  fs.ensureFileSync(path);
  Deno.writeTextFileSync(path, answer);
  return answer;
}

function formatTime(ms) {
  if (Math.round(ms * 1000) < 1000) {
    return Math.round(ms * 1000).toString().padStart(3) + "μs"
  } else if (Math.round(ms) < 1000) {
    return Math.round(ms).toString().padStart(3) + "ms";
  } else {
    return Math.round(ms / 1000).toString().padStart(4) + "s";
  }
}

async function runDay(year, day) {
  const solution = await import(`./${year}/${day}.js`);

  let input = (await getInput(year, day)).trimEnd();
  if (solution.parse) {
    input = await solution.parse(input);
  }

  if (solution.test) {
    await solution.test();
  }

  for (const part of [1, 2]) {
    const partN = solution[`part${part}`];
    if (partN) {
      const start = performance.now();
      const answer = (await partN(input)).toString();
      const elapsed = performance.now() - start;

      const expectedAnswer = await getAnswer(year, day, part);

      console.log(
        `${year}/${day}/${part} ${formatTime(elapsed)} ${answer.padEnd(60)} ${
          answer === expectedAnswer ? "OK" : `WRONG ${expectedAnswer}`
        }`,
      );

      if (answer !== expectedAnswer) {
        Deno.exit(1);
      }
    }
  }
}

async function runYear(year) {
  for (const day of days(year)) {
    await runDay(year, day);
  }
}

async function run() {
  for (const year of years()) {
    await runYear(year);
  }
}

if (Deno.args.length === 0) {
  await run();
} else if (Deno.args.length === 1) {
  await runYear(Deno.args[0]);
} else if (Deno.args.length === 2) {
  await runDay(Deno.args[0], Deno.args[1].toString().padStart(2, "0"));
}
