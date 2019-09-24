import assert from 'assert';
import fs from 'fs';
// import path from 'path';
// import parseFile from '../src/parsers';
import genDiff from '../src';

// const result = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');

// const firstJSON = `${__dirname}/__fixtures__/before.json`;
// const secondJSON = `${__dirname}/__fixtures__/after.json`;

// const firstYAML = `${__dirname}/__fixtures__/before.yaml`;
// const secondYAML = `${__dirname}/__fixtures__/after.yaml`;

// const firstINI = `${__dirname}/__fixtures__/before.ini`;
// const secondINI = `${__dirname}/__fixtures__/after.ini`;

// const newFirstJSON = `${__dirname}/__fixtures__/newBefore.json`;
// const newSecondJSON = `${__dirname}/__fixtures__/newAfter.json`;

// const newFirstJSONData = fs.readFileSync(`${__dirname}/__fixtures__/flatBefore.json`, 'utf8');
// const tempFirst = JSON.parse(newFirstJSONData);
// const newSecondJSONData = fs.readFileSync(`${__dirname}/__fixtures__/flatAfter.json`, 'utf8');
// const tempSecond = JSON.parse(newSecondJSONData);

const newResult = fs.readFileSync(`${__dirname}/__fixtures__/plainFlatResult.txt`, 'utf8');
const firstFile = `${__dirname}/__fixtures__/nestedBefore.json`;
const secondFile = `${__dirname}/__fixtures__/nestedAfter.json`;
const format = 'plain';

describe('new test 2', () => {
  it('JSON', () => {
    assert.equal(genDiff(firstFile, secondFile, format), newResult);
  });
});

// describe('test stringify', () => {
//   it('JSON', () => {
//     assert.equal(JSON.stringify(tempFirst), newResult);
//   });
// });
