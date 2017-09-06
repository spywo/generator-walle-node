module.exports = config => {
  return {
    entry: ['babel-polyfill', config.entry],
    output: config.output
  }
};
