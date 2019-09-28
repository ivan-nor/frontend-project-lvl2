import fs from 'fs';
import genDiff from '../src';

describe('gendiff', () => {
  it('nested files with nestedResult.txt, formatter - recursive', () => {
    const formatter = 'recursive';
    const nestedResult = fs.readFileSync(`${__dirname}/__fixtures__/nestedResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/nestedBefore.json`;
    const pathToSecond = `${__dirname}/__fixtures__/nestedAfter.json`;

    expect(genDiff(pathToFirst, pathToSecond, formatter)).toBe(nestedResult);
  });

  it('flat files with plainFlatResult.txt, formatter - plain', () => {
    const flatResult = fs.readFileSync(`${__dirname}/__fixtures__/plainFlatResult.txt`, 'utf8');
    const pathToFirst = `${__dirname}/__fixtures__/flatBefore.yaml`;
    const pathToSecond = `${__dirname}/__fixtures__/flatAfter.yaml`;
    const formatter = 'plain';
    expect(genDiff(pathToFirst, pathToSecond, formatter)).toBe(flatResult);
  });

  it('ini files with flatResult.txt, formatter - recursive', () => {
    const formatter = 'recursive';
    const pathToFirst = `${__dirname}/__fixtures__/before.ini`;
    const pathToSecond = `${__dirname}/__fixtures__/after.ini`;
    const flatResult = fs.readFileSync(`${__dirname}/__fixtures__/flatResult.txt`, 'utf8');
    expect(genDiff(pathToFirst, pathToSecond, formatter)).toBe(flatResult);
  });

  it('nested yaml files with jsonNestedResult.txt, formatter - json', () => {
    const formatter = 'json';
    const pathToFirst = `${__dirname}/__fixtures__/nestedBefore.yaml`;
    const pathToSecond = `${__dirname}/__fixtures__/nestedAfter.yaml`;
    const flatResult = fs.readFileSync(`${__dirname}/__fixtures__/nestedJsonResult.txt`, 'utf8');
    expect(genDiff(pathToFirst, pathToSecond, formatter)).toBe(flatResult);
  });
});
