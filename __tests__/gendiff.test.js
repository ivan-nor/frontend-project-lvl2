import fs from 'fs';
import genDiff from '../src';

const nestedResult = fs.readFileSync(`${__dirname}/__fixtures__/nestedResult.txt`, 'utf8');
const pathToFirst = `${__dirname}/__fixtures__/nestedBefore.json`;
const pathToSecond = `${__dirname}/__fixtures__/nestedAfter.json`;

describe('test', () => {
  it('yet another test', () => {
    expect(genDiff(pathToFirst, pathToSecond)).toBe(nestedResult);
  });
});
