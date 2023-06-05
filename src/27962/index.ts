import {readFileSync} from 'fs';

const inputPath = 'src/27962/input.txt';
// const inputPath = '/dev/stdin';
const [n, str] = readFileSync(inputPath).toString().split('\n');
const N = Number(n);

let ans = 'NO';
for (let i = 1; i < N; i++) {
  let cnt = 0;
  for (let j = 0; j < i; j++) {
    if (str[j] !== str[N - i + j]) {
      cnt++;
      if (cnt > 1) break;
    }
  }

  if (cnt === 1) {
    ans = 'YES';
    break;
  }
}

console.log(ans);
