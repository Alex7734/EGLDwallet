module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '\\.pnp\\.[^\\/]+$',
  ],
};
