import fs from 'fs';
import genDiff from '../src';

const getPath = filename => `${__dirname}/__fixtures__/nested/${filename}`;
const getResultData = filename => fs.readFileSync(`${__dirname}/__fixtures__/nested/${filename}`, 'utf8');

describe('gendiff', () => {
  it('json files, formatter - plain', () => {
    expect(genDiff(getPath('before.json'), getPath('after.json'), 'plain'))
      .toBe(getResultData('plainResult.txt'));
  });

  it('ini files, formatter - recursive', () => {
    expect(genDiff(getPath('before.ini'), getPath('after.ini'), 'recursive'))
      .toBe(getResultData('recursiveIniResult.txt'));
  });

  it('yaml files, formatter - json', () => {
    expect(genDiff(getPath('before.yaml'), getPath('after.yaml'), 'json'))
      .toBe(getResultData('jsonResult.txt'));
  });

  it('json files, formatter - recursive', () => {
    expect(genDiff(getPath('before.json'), getPath('after.json'), 'recursive'))
      .toBe(getResultData('recursiveResult.txt'));
  });
});
