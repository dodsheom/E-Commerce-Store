const welcome = (name) => {
  return `Welcome ${name} to Node.js modules`;
};

const sum = (a, b) => {
  return a + b;
};

module.exports = {
  welcome,
  sum
};
