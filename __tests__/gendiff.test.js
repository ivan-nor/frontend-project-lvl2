import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('nested files are compared with the nestedResult.txt', () => {
    const nestedResult = fs.readFileSync(`${__dirname}/__fixtures__/nestedResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/nestedBefore.json`;
    const pathToSecond = `${__dirname}/__fixtures__/nestedAfter.json`;
    expect(genDiff(pathToFirst, pathToSecond)).toBe(nestedResult);
  });
});
