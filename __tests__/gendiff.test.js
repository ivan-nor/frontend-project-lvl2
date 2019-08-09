import assert from 'assert';
import fs from 'fs';
// import path from 'path';
import gendiff from '../src/bin/gendiff';

const result = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');

const firstJSON = `${__dirname}/__fixtures__/before.json`;
const secondJSON = `${__dirname}/__fixtures__/after.json`;

const firstYAML = `${__dirname}/__fixtures__/before.yaml`;
const secondYAML = `${__dirname}/__fixtures__/after.yaml`;

const firstINI = `${__dirname}/__fixtures__/before.ini`;
const secondINI = `${__dirname}/__fixtures__/after.ini`;

// describe('gendiff', () => {
//   it('JSON', () => {
//     assert.equal(gendiff(firstJSON, secondJSON), result);
//   });
//   it('YAML', () => {
//     assert.equal(gendiff(firstYAML, secondYAML), result);
//   });
//   it('INI', () => {
//     assert.equal(gendiff(firstINI, secondINI), result);
//   });
// });

const arr = [
  [firstJSON, secondJSON, result],
  [firstYAML, secondYAML, result],
  [firstINI, secondINI, result],
];
test.each(arr)(
  '%#',
  (a, b, expected) => {
    expect(gendiff(a, b)).toBe(expected);
  },
);
