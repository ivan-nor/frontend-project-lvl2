import fs from 'fs';
import genDiff from '../src';

const getPathToBefore = extention => `${__dirname}/__fixtures__/nested/before${extention}`;
const getPathToAfter = extention => `${__dirname}/__fixtures__/nested/after${extention}`;
const getResultData = filename => fs.readFileSync(`${__dirname}/__fixtures__/nested/${filename}`, 'utf8');

describe.each`

    extention   |     format     |       expectedValue
  ${'.json'}    | ${'plain'}     | ${getResultData('plainResult.txt')}
  ${'.ini'}     | ${'recursive'} | ${getResultData('recursiveIniResult.txt')}
  ${'.yaml'}    | ${'json'}      | ${getResultData('jsonResult.txt')}
  ${'.json'}    | ${'recursive'} | ${getResultData('recursiveResult.txt')}

`('gendiff', ({ extention, format, expectedValue }) => {
  test(`${extention} files, formatter - ${format}`, () => {
    const before = getPathToBefore(extention);
    const after = getPathToAfter(extention);

    const actualValue = genDiff(before, after, format);

    expect(actualValue).toBe(expectedValue);
  });
});
