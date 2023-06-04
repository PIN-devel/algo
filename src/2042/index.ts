import {readFileSync} from 'fs';

const inputPath = 'src/2042/input.txt';
// const inputPath = '/dev/stdin';
const inputList = readFileSync(inputPath).toString().split('\n');
const N = Number(inputList[0].split(' ')[0]);

const B0 = BigInt(0);
const temp: bigint[] = Array.from({length: N + 1}, () => B0);
const tree: bigint[] = Array.from({length: N + 1}, () => B0);

function sum(i: number) {
  let ret = B0;
  while (i > 0) {
    ret += tree[i];
    i -= i & -i;
  }
  return ret;
}

function update(i: number, dif: bigint) {
  while (i < tree.length) {
    tree[i] += dif;
    i += i & -i;
  }
}

for (let i = 1; i <= N; i++) {
  update(i, (temp[i] = BigInt(inputList[i])));
}

const ans = [];
for (let i = N + 1; i < inputList.length; i++) {
  const [a, b, c] = inputList[i].split(' ');

  if (a === '1') {
    const idx = Number(b);
    const data = BigInt(c);
    const dif = data - temp[idx];
    temp[idx] = data;
    update(idx, dif);
  } else if (a === '2') {
    const idx1 = Number(b);
    const idx2 = Number(c);
    ans.push(sum(idx2) - sum(idx1 - 1));
  }
}

console.log(ans.join('\n'));
