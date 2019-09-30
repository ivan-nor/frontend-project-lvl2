import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('json files, formatter - plain', () => {
    const result = fs.readFileSync(`${__dirname}/__fixtures__/nested/plainResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/nested/before.json`;
    const pathToSecond = `${__dirname}/__fixtures__/nested/after.json`;
    expect(genDiff(pathToFirst, pathToSecond, 'plain')).toBe(result);
  });

  it('ini files, formatter - recursive', () => {
    const pathToFirst = `${__dirname}/__fixtures__/nested/before.ini`;
    const pathToSecond = `${__dirname}/__fixtures__/nested/after.ini`;
    const result = fs.readFileSync(`${__dirname}/__fixtures__/nested/recursiveIniResult.txt`, 'utf8');
    expect(genDiff(pathToFirst, pathToSecond, 'recursive')).toBe(result);
  });

  it('yaml files, formatter - json', () => {
    const pathToFirst = `${__dirname}/__fixtures__/nested/before.yaml`;
    const pathToSecond = `${__dirname}/__fixtures__/nested/after.yaml`;
    const result = fs.readFileSync(`${__dirname}/__fixtures__/nested/jsonResult.txt`, 'utf8');
    expect(genDiff(pathToFirst, pathToSecond, 'json')).toBe(result);
  });

  it('json files, formatter - recursive', () => {
    const result = fs.readFileSync(`${__dirname}/__fixtures__/nested/recursiveResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/nested/before.json`;
    const pathToSecond = `${__dirname}/__fixtures__/nested/after.json`;
    expect(genDiff(pathToFirst, pathToSecond, 'recursive')).toBe(result);
  });
});
