import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../projects/prism-lib/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    // @ts-ignore
    autodocs: 'tag',
  },








};

export default config;
