import {readFileSync} from 'fs';

const inputPath = 'src/18429/input.txt';
// const inputPath = '/dev/stdin';
const inputs = readFileSync(inputPath).toString().split('\n');
const [N, K] = inputs[0].split(' ').map(Number);
const exercises = inputs[1].split(' ').map(Number);

let ans = 0;
const exercised = new Array(N).fill(false);

const find = (i: number, sum: number) => {
  if (i >= N) {
    ans++;
    return;
  }
  for (let idx = 0; idx < N; idx++) {
    const exercise = exercises[idx];
    const nextSum = sum + exercise - K;
    if (!exercised[idx] && nextSum >= 0) {
      exercised[idx] = true;
      find(i + 1, nextSum);
      exercised[idx] = false;
    }
  }
};

find(0, 0);
console.log(ans);
