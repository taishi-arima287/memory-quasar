import type { StorybookConfig } from '@storybook/react-webpack5';
import type { Configuration } from 'webpack';

const config = {
  stories: ['../ui/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['@babel/preset-typescript', {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        onlyRemoveTypeImports: true,
      }],
    ],
  }),
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config: Configuration): Promise<Configuration> => {
    const rules = config.module?.rules?.filter((rule: any) => {
      return !(rule.test instanceof RegExp && rule.test.test('.css'));
    }) || [];

    rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
        },
      ],
    });

    return {
      ...config,
      module: {
        ...config.module,
        rules,
      },
    };
  },
} satisfies StorybookConfig;

export default config;