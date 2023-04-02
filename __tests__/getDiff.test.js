import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml1 = getFixturePath('file1.yaml');
const yaml2 = getFixturePath('file2.yaml');

const formatCases = [
  {
    format: undefined,
    expectedFile: 'expectedStylish.txt',
  },
  {
    format: 'stylish',
    expectedFile: 'expectedStylish.txt',
  },
  {
    format: 'plain',
    expectedFile: 'expectedPlain.txt',
  },
  {
    format: 'json',
    expectedFile: 'expectedJson.txt',
  },
];

describe.each(formatCases)('Testing function gendiff', ({ format, expectedFile }) => {
  const expected = readFile(expectedFile);

  test(`formatter ${format}, json-json files`, () => {
    const actual = genDiff(json1, json2, format);
    expect(actual).toBe(expected);
  });

  test(`formatter ${format}, json-yml files`, () => {
    const actual = genDiff(json1, yaml2, format);
    expect(actual).toBe(expected);
  });

  test(`formatter ${format}, yml-yml files`, () => {
    const actual = genDiff(yaml1, yaml2, format);
    expect(actual).toBe(expected);
  });

  test(`formatter ${format}, yml-json files`, () => {
    const actual = genDiff(yaml1, json2, format);
    expect(actual).toBe(expected);
  });
});