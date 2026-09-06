import type { StorybookConfig } from "@storybook/react-webpack5";

const config = {
  stories: ["../ui/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: false,
  },
  babel: async (options) => ({
    ...options,
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      ["@babel/preset-react", { runtime: "automatic" }],
      [
        "@babel/preset-typescript",
        {
          isTSX: true,
          allExtensions: true,
          allowNamespaces: true,
          onlyRemoveTypeImports: true,
        },
      ],
    ],
  }),
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config: any) => {
    // 既存のCSSルールを削除し、Tailwind を通すために postcss-loader 付きで処理し直す
    config.module.rules = config.module.rules.filter((rule: any) => !rule.test?.test?.(".css"));

    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
    });

    return config;
  },
};

export default config;
