module.exports = {
  displayName: 'core',
  preset: '../../jest.preset.js',
  globals: {
    'babel-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts','tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/core',
};
