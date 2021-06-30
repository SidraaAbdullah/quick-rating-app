module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            modules: './src/modules',
            lib: './src/lib',
            types: './src/types',
            constants: './src/constants',
          },
        },
      ],
    ],
  };
};
