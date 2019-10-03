import fs from 'fs';
import genDiff from '../src';

const getPathToBefore = extention => `${__dirname}/__fixtures__/nested/before${extention}`;
const getPathToAfter = extention => `${__dirname}/__fixtures__/nested/after${extention}`;
const getResultData = filename => fs.readFileSync(`${__dirname}/__fixtures__/nested/${filename}`, 'utf8');

describe.each`

    extention   |     format     |     pathToResult
  ${'.json'}    | ${'plain'}     | ${'plainResult.txt'}
  ${'.ini'}     | ${'recursive'} | ${'recursiveIniResult.txt'}
  ${'.yaml'}    | ${'json'}      | ${'jsonResult.txt'}
  ${'.json'}    | ${'recursive'} | ${'recursiveResult.txt'}

`('gendiff', ({ extention, format, pathToResult }) => {
  test(`${extention} files, formatter - ${format}`, () => {
    const before = getPathToBefore(extention);
    const after = getPathToAfter(extention);

    const actualValue = genDiff(before, after, format);
    const expectedValue = getResultData(pathToResult);

    expect(actualValue).toBe(expectedValue);
  });
});
