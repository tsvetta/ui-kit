import React from 'react';
import requireContext from 'require-context.macro';
import { setAppElement } from 'react-modal';
import { addParameters, configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withThemes } from 'storybook-addon-themes';
import whitepaperStorybookTheme from './whitepaperStorybookTheme';
import '@yankovsky/whitepaper-bem';
import '../src/config/react-modal/config';
import '../src/index.css';

setAppElement(document.body);

// Подключаем все темы для возможности переключения в storybook'е
const requireTheme = requireContext('../src/themes', false, /\.css$/);
requireTheme.keys().forEach(filename => requireTheme(filename));

addParameters({
  options: {
    theme: whitepaperStorybookTheme,
  },
  // Эта переменная определяется через DefinePlugin в src/webpack.config.js и в src/setupTests.js
  // eslint-disable-next-line no-undef
  themes: WHITEPAPER_THEMES,
});

addDecorator(withA11y);

addDecorator(story => {
  document.documentElement.style.padding = '50px';
  document.documentElement.style.background = '#efefef';
  return story();
});

addDecorator(story => {
  return <div id="app">{story()}</div>;
});

addDecorator(withThemes);

const req = requireContext('../src', true, /.stories.(j|t)sx$/); // TODO: изменить на /.stories.tsx$/

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);