module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.js'],
        root: ['.'],
        alias: {
          '@app': './src/app',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@helpers': './src/helpers',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@constants': './src/types/constants',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@wallet': './src/modules/wallet',
        },
      },
    ],
  ],
};
