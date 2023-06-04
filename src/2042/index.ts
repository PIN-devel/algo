import {readFileSync} from 'fs';

const inputPath = 'src/2042/input.txt';
// const inputPath = '/dev/stdin';
const inputList = readFileSync(inputPath).toString().split('\n');
const [N] = inputList[0].split(' ').map(Number);

function sum(tree: bigint[], i: number) {
  let ret = BigInt(0);
  while (i > 0) {
    ret += tree[i];
    i -= i & -i;
  }
  return ret;
}

function update(tree: bigint[], i: number, dif: bigint) {
  while (i < tree.length) {
    tree[i] += dif;
    i += i & -i;
  }
}

const numList: bigint[] = Array.from({length: N + 1}, () => BigInt(0));
const tree: bigint[] = Array.from({length: N + 1}, () => BigInt(0));
for (let i = 1; i <= N; i++) {
  numList[i] = BigInt(inputList[i]);
  update(tree, i, numList[i]);
}

for (let i = N + 1; i < inputList.length; i++) {
  const cmd = inputList[i].split(' ');
  const a = Number(cmd[0]);

  if (a === 1) {
    const b = Number(cmd[1]);
    const c = BigInt(cmd[2]);
    const dif = c - numList[b];
    update(tree, b, dif);
  } else {
    const b = Number(cmd[1]);
    const c = Number(cmd[2]);
    console.log((sum(tree, c) - sum(tree, b - 1)).toString());
  }
}
