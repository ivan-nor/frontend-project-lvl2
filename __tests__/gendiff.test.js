import assert from 'assert';
import fs from 'fs';
import path from 'path';
import gendiff from '../src/bin/gendiff';

const first = path.resolve(__dirname, '../src/file1.json');
const second = './src/file2.json';
const result = fs.readFileSync(path.resolve(__dirname, '__fixtures__/result.txt'), 'utf8');

describe('gendiff', () => {
  it('сравниваем построчно', () => {
    assert.notEqual(gendiff(first, second), result);
  });
});
