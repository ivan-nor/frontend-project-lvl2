import assert from 'assert';
import fs from 'fs';
// import path from 'path';
import gendiff from '../src/bin/gendiff';

const first = `${__dirname}/__fixtures__/before.json`;
const second = `${__dirname}/__fixtures__/after.json`;
const result = fs.readFileSync('__tests__/__fixtures__/result.txt', 'utf8');

describe('gendiff', () => {
  it('сравниваем построчно', () => {
    assert.equal(gendiff(first, second), result);
  });
});
