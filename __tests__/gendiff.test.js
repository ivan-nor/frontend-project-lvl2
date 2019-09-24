import assert from 'assert';
import fs from 'fs';
import genDiff from '../src';

const newResult = fs.readFileSync(`${__dirname}/__fixtures__/nestedResult.txt`, 'utf8');
const firstFile = `${__dirname}/__fixtures__/nestedBefore.json`;
const secondFile = `${__dirname}/__fixtures__/nestedAfter.json`;

describe('test', () => {
  it('yet another test', () => {
    assert.equal(genDiff(firstFile, secondFile), newResult);
  });
});
