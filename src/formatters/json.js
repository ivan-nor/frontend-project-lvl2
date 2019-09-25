const jsonAst = (ast) => {
  const result = JSON.stringify(ast, null, 2);
  return result;
};

export default jsonAst;
