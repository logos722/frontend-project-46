import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const extensions = ['yml', 'json'];

test.each(extensions)('test gendiff with extension', (extension) => {
  const fileBefore = getFixturePath(`file1.${extension}`);
  const fileAfter = getFixturePath(`file2.${extension}`);
  const expectedStylishResult = readFile('expectedStylish.txt');
  const expectedPlainResult = readFile('expectedPlain.txt');
  const expectedJsonResult = readFile('expectedJson.txt');
  const stylishResult = genDiff(fileBefore, fileAfter, 'stylish');
  const plainResult = genDiff(fileBefore, fileAfter, 'plain');
  const jsonResult = genDiff(fileBefore, fileAfter, 'json');
  const noFormatResult = genDiff(fileBefore, fileAfter);
  expect(stylishResult).toBe(expectedStylishResult);
  expect(plainResult).toBe(expectedPlainResult);
  expect(jsonResult).toBe(expectedJsonResult);
  expect(noFormatResult).toBe(expectedStylishResult);
});
