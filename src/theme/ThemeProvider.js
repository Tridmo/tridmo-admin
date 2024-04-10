"use client"

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/styled-engine';
import { themeCreator } from './base';

export const ThemeContext = React.createContext();

const ThemeProviderWrapper = function (props) {
  const curThemeName = 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    // localStorage.setItem('appTheme', themeName);
    // _setThemeName(themeName);
  };
  // injectFirst
  return (
    <StyledEngineProvider injectFirst>
      {/* <CacheProvider value={cacheRtl}> */}
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
      {/* </CacheProvider> */}
    </StyledEngineProvider>
  );
};

export default ThemeProviderWrapper;
