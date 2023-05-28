import {readFileSync} from 'fs';

const inputPath = 'src/12789/input.txt';
// const inputPath = '/dev/stdin';
const [, data] = readFileSync(inputPath).toString().split('\n');
const queue = data
  .trim()
  .split(' ')
  .map(x => Number(x));
const stack = [];

let cursor = 1;
while (queue.length) {
  const item = queue[0];
  if (item === cursor) {
    queue.shift();
    cursor += 1;
    // } else if (stack.length && stack.at(-1) === cursor) {
  } else if (stack.length && stack[stack.length - 1] === cursor) {
    stack.pop();
    cursor += 1;
  } else {
    stack.push(queue.shift());
  }
}

while (stack.length) {
  // if (stack.at(-1) === cursor) {
  if (stack[stack.length - 1] === cursor) {
    stack.pop();
    cursor += 1;
  } else {
    break;
  }
}

console.log(stack.length ? 'Sad' : 'Nice');
