import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('nested files with nestedResult.txt, formatter - recursive', () => {
    const nestedResult = fs.readFileSync(`${__dirname}/__fixtures__/nested/recursiveResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/nested/before.json`;
    const pathToSecond = `${__dirname}/__fixtures__/nested/after.json`;
    expect(genDiff(pathToFirst, pathToSecond, 'recursive')).toBe(nestedResult);
  });

  it('flat files with plainFlatResult.txt, formatter - plain', () => {
    const flatResult = fs.readFileSync(`${__dirname}/__fixtures__/flat/plainResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/flat/before.yaml`;
    const pathToSecond = `${__dirname}/__fixtures__/flat/after.yaml`;
    expect(genDiff(pathToFirst, pathToSecond, 'plain')).toBe(flatResult);
  });

  it('ini files with flatResult.txt, formatter - recursive', () => {
    const pathToFirst = `${__dirname}/__fixtures__/flat/before.ini`;
    const pathToSecond = `${__dirname}/__fixtures__/flat/after.ini`;
    const flatResult = fs.readFileSync(`${__dirname}/__fixtures__/flat/recursiveResult.txt`, 'utf8');
    expect(genDiff(pathToFirst, pathToSecond, 'recursive')).toBe(flatResult);
  });

  it('nested yaml files with jsonNestedResult.txt, formatter - json', () => {
    const pathToFirst = `${__dirname}/__fixtures__/nested/before.yaml`;
    const pathToSecond = `${__dirname}/__fixtures__/nested/after.yaml`;
    const flatResult = fs.readFileSync(`${__dirname}/__fixtures__/nested/jsonResult.txt`, 'utf8');
    expect(genDiff(pathToFirst, pathToSecond, 'json')).toBe(flatResult);
  });
});
