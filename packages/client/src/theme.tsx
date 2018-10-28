import * as React from 'react';
import Typography from 'typography';
import oceanBeachTheme from 'typography-theme-ocean-beach';
import CodePlugin from 'typography-plugin-code';
import { TypographyStyle, GoogleFont } from 'react-typography';
import { ThemeProvider } from 'styled-components';

oceanBeachTheme.plugins = [new CodePlugin()];
const typography = new Typography(oceanBeachTheme);

const DEFAULT_THEME = {
  colors: {
    cta: '#05f',
    spotify: '#1DB954',
    black: '#191414',
  },
  textColors: {
    primary: 'rgba(0, 0, 0, 0.73)',
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
