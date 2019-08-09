import assert from 'assert';
import fs from 'fs';
// import path from 'path';
import gendiff from '../src/bin/gendiff';

const firstJSON = `${__dirname}/__fixtures__/before.json`;
const secondJSON = `${__dirname}/__fixtures__/after.json`;
const result = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');
// console.log(result);
const firstYAML = `${__dirname}/__fixtures__/before.yaml`;
const secondYAML = `${__dirname}/__fixtures__/after.yaml`;

describe('gendiff', () => {
  it('JSON', () => {
    assert.equal(gendiff(firstJSON, secondJSON), result);
  });
  it('YAML', () => {
    assert.equal(gendiff(firstYAML, secondYAML), result);
  });
});
