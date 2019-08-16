import assert from 'assert';
import fs from 'fs';
// import path from 'path';
// import gendiff from '../src/bin/gendiff';
// import { renderer, parseAST, compare } from '../src/compares';
// import parseFile from '../src/parsers';
import { render, parseAst } from '../src/comparer2';

// const result = fs.readFileSync(`${__dirname}/__fixtures__/result.txt`, 'utf8');

// const firstJSON = `${__dirname}/__fixtures__/before.json`;
// const secondJSON = `${__dirname}/__fixtures__/after.json`;

// const firstYAML = `${__dirname}/__fixtures__/before.yaml`;
// const secondYAML = `${__dirname}/__fixtures__/after.yaml`;

// const firstINI = `${__dirname}/__fixtures__/before.ini`;
// const secondINI = `${__dirname}/__fixtures__/after.ini`;

// const newFirstJSON = `${__dirname}/__fixtures__/newBefore.json`;
// const newSecondJSON = `${__dirname}/__fixtures__/newAfter.json`;

const newFirstJSONData = fs.readFileSync(`${__dirname}/__fixtures__/newBefore.json`, 'utf8');
const tempFirst = JSON.parse(newFirstJSONData);
const newSecondJSONData = fs.readFileSync(`${__dirname}/__fixtures__/newAfter.json`, 'utf8');
const tempSecond = JSON.parse(newSecondJSONData);
const newResult = fs.readFileSync(`${__dirname}/__fixtures__/newResult.txt`, 'utf8');

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

// const arr = [
// [tempFirst, tempSecond, newResult],
// [newFirstJSON, newSecondJSON, newResult],
// [firstJSON, secondJSON, result],
// [firstYAML, secondYAML, result],
// [firstINI, secondINI, result],
// ];
// test.each(arr)(
//   '%#',
//   (a, b, expected) => {
//     expect(gendiff(a, b)).toBe(expected);
//   },
// );

// test.each(arr)(
//   '%#',
//   (a, b, expected) => {
//     expect(render(a, b)).toBe(expected);
//   },
// );

const rendering = render(tempFirst, tempSecond);

// describe('new test', () => {
//   it('JSON', () => {
//     assert.equal(rendering, newResult);
//   });
// });

describe('new test 2', () => {
  it('JSON', () => {
    assert.equal(parseAst(rendering), newResult);
  });
});

// describe('test stringify', () => {
//   it('JSON', () => {
//     assert.equal(JSON.stringify(tempFirst), newResult);
//   });
// });
