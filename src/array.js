// based on clojure.core/partition
export function chunk(n, step, arr) {
  if (!arr) {
    arr = step;
    step = n;
  }
  const chunks = [];
  for (let i = 0; i + n - 1 < arr.length; i += step) {
    chunks.push([]);
    for (let j = 0; j < n; j++) {
      chunks[chunks.length - 1].push(arr[i + j]);
    }
  }
  return chunks;
}
