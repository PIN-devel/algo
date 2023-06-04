import {readFileSync} from 'fs';

const inputPath = 'src/2042/input.txt';
// const inputPath = '/dev/stdin';
const inputList = readFileSync(inputPath).toString().split('\n');
const [N] = inputList[0].split(' ').map(Number);

class RangeSumTree {
  len: number;
  sumList: bigint[];

  constructor(dataList: bigint[]) {
    this.len = dataList.length;
    this.sumList = [...Array(4 * this.len)];
    this.init(dataList);
  }

  private init = (
    dataList: bigint[],
    node = 0,
    str = 0,
    end = this.len - 1
  ): bigint => {
    if (str === end) return (this.sumList[node] = dataList[str]);

    const mid = Math.floor((str + end) / 2);
    const left = this.init(dataList, node * 2 + 1, str, mid);
    const right = this.init(dataList, node * 2 + 2, mid + 1, end);
    return (this.sumList[node] = left + right);
  };

  getSum = (
    from: number,
    to: number,
    node = 0,
    str = 0,
    end = this.len - 1
  ): bigint => {
    if (from > end || to < str) return BigInt(0);

    if (from <= str && to >= end) return this.sumList[node];

    const mid = Math.floor((str + end) / 2);
    const left = this.getSum(from, to, node * 2 + 1, str, mid);
    const right = this.getSum(from, to, node * 2 + 2, mid + 1, end);
    return left + right;
  };

  update = (
    idx: number,
    data: bigint,
    node = 0,
    str = 0,
    end = this.len - 1
  ): bigint => {
    if (idx < str || idx > end) return this.sumList[node];

    if (str === end) return (this.sumList[node] = data);

    const mid = Math.floor((str + end) / 2);
    const left = this.update(idx, data, node * 2 + 1, str, mid);
    const right = this.update(idx, data, node * 2 + 2, mid + 1, end);
    return (this.sumList[node] = left + right);
  };
}
const rst = new RangeSumTree(inputList.slice(1, N + 1).map(BigInt));

for (let i = N + 1; i < inputList.length; i++) {
  const [a, b, c] = inputList[i].split(' ').map(Number);

  if (a === 1) {
    rst.update(b - 1, BigInt(c));
  } else if (a === 2) {
    console.log(rst.getSum(b - 1, c - 1).toString());
  }
}
