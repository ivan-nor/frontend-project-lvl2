import _ from 'lodash';

const tab = '  ';

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';

const stringify = (obj, depthOfTabs) => {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const list = _.keys(obj);
    const separator = list.length > 0 ? '\n' : '';
    const result = list.reduce((acc, key) => {
      const str = `${tab.repeat(depthOfTabs + 2)}${key}: ${obj[key]}${separator}`;
      return `${acc}${str}`;
    }, '');
    return `{\n${result}${tab.repeat(depthOfTabs)}}`;
  }
  return `${obj}`;
};

const plainAst = (ast) => {
  return 'NO TEXT';
};

export default plainAst;
