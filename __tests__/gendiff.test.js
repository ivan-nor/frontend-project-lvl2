import assert from 'assert';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/bin/gendiff';

const first = path.resolve(__dirname, '../src/file1.json');
const second = './src/file2.json';
console.log(first, second);
const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result.txt'), 'utf8');
// console.log(result);

describe('gendiff', () => {
  it('сравниваем построчно', () => {
    assert.equal(gendiff(first, second), result);
  });
});
