import _ from 'lodash';

const buildInternalTree = (beforeData, afterData) => {
  const result = _
    .union(_.keys(beforeData), _.keys(afterData))
    .map((name) => {
      if (typeof beforeData[name] === 'object' && typeof afterData[name] === 'object') {
        return {
          name,
          type: 'unchanged',
          value: buildInternalTree(beforeData[name], afterData[name])
        };
      }
      if (beforeData[name] === afterData[name]) {
        return {
          name,
          type: 'unchanged',
          value: beforeData[name],
        };
      }
      if (!_.has(afterData, name) && _.has(beforeData, name)) {
        return {
          name,
          type: 'deleted',
          value: beforeData[name],
        };
      }
      if (!_.has(beforeData, name) && _.has(afterData, name)) {
        return {
          name,
          type: 'added',
          value: afterData[name],
        };
      }
      if (beforeData[name] !== afterData[name]) {
        return {
          name,
          type: 'changed',
          value: afterData[name],
          prevValue: beforeData[name],
        };
      }
    });
  return result;
};

export default buildInternalTree;
