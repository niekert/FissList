import * as React from 'react';
import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';
import CodePlugin from 'typography-plugin-code';
import { TypographyStyle } from 'react-typography';
import { ThemeProvider } from 'styled-components';

oceanBeachTheme.plugins = [new CodePlugin()];
const typography = new Typography(oceanBeachTheme);

const DEFAULT_THEME = {
  colors: {
    cta: '#05f',
    activeBackground: '#f0f6ff',
    spotify: '#1DB954',
    black: '#191414',
    outline: '#CCD9DF',
    primary: '#FFF',
    success: '#2daf49',
    notification: '#DB5850',
    danger: '#DB5850',
    favorited: '#E0235E',
    raisedInput: 'rgba(225, 230, 231, 0.7)',
  },
  spacing: ['0px', '8px', '16px', '24px'],
  textColors: {
    active: '#333',
    primary: 'rgba(0, 0, 0, 0.73)',
    secondary: '#555555',
  },
};

export default function Theme({ children }) {
  return (
    <>
      <TypographyStyle typography={typography} />
      <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>
    </>
  );
}
