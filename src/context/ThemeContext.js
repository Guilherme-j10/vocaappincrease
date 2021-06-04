import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  
  const colorScheme = Appearance.getColorScheme();
  const [ ThemeContextColor, setThemeContextColor ] = useState(true);

  // useEffect(() => {
  //   if(colorScheme === 'dark'){
  //     setThemeContextColor(true);
  //   }

  //   setThemeContextColor(false);
  // }, [])

  return(
    <ThemeContext.Provider value={ThemeContextColor} >
      {children}
    </ThemeContext.Provider>
  );
}

