import _ from 'lodash';
import parser from './parser.js';

const getDiff = (filePath1, filePath2) => {
    const obj1 = parser(filePath1);
    const obj2 = parser(filePath2);
    const keysOfObj1 = _.keys(obj1);
    const keysOfObj2 = _.keys(obj2);
    const concatKeys = keysOfObj1.concat(keysOfObj2);
    const uniqKeys = _.uniq(concatKeys);
    const sortedUniqKeys = uniqKeys.sort();

    const resultPush = sortedUniqKeys.reduce((acc, key) => {
        // если в первом объекте есть ключ, во втором нет
        if (_.has(obj1, key) && !_.has(obj2, key)) acc.push(`- ${key}: ${obj1[key]}`);
        // если во втором объекте есть ключ, в первом нет
        if (!_.has(obj1, key) && _.has(obj2, key)) acc.push(`+ ${key}: ${obj2[key]}`);
        // если ключ есть в обоих объектах
        if (_.has(obj1, key) && _.has(obj2, key)) {
          // если значения совпадают
          if (_.isEqual(obj1[key], obj2[key])) acc.push(`  ${key}: ${obj1[key]}`);
          // если значения разные
          else {
            acc.push(`- ${key}: ${obj1[key]}`);
            acc.push(`+ ${key}: ${obj2[key]}`);
          }
        }
        return acc;
      }, []);
    
      const string = resultPush.join('\n  ');
    
      const result = `{ \n  ${string}\n}`;
    
      return result;
}

export default getDiff;