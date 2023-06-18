import {readFileSync} from 'fs';

const inputPath = 'src/14267/input.txt';
// const inputPath = '/dev/stdin';
const inputs = readFileSync(inputPath).toString().split('\n');
const [n, m] = inputs[0].split(' ').map(Number);
const sups = inputs[1].split(' ').map(x => x.trim());
const graph: Record<string, string[]> = {};
for (let i = 0; i < sups.length; i++) {
  const element = sups[i];
  if (graph[element]) {
    graph[element].push(String(i + 1));
  } else {
    graph[element] = [String(i + 1)];
  }
}

const ans = Array.from({length: n}, () => 0);

for (let i = 0; i < m; i++) {
  const [empNo, num] = inputs[2 + i].split(' ').map(Number);
  ans[empNo - 1] += num;
}

function dfs(start: string) {
  if (graph[start]) {
    for (let i = 0; i < graph[start].length; i++) {
      const next = graph[start][i];
      ans[Number(next) - 1] += ans[Number(start) - 1];
      dfs(next);
    }
  }
}

dfs('1');

console.log(ans.join(' '));
