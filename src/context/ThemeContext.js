import React, { createContext, useState, useEffect } from 'react';
import { Appearance, useColorScheme } from 'react-native';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  
  const colorScheme = useColorScheme();
  const [ ThemeContextColor, setThemeContextColor ] = useState(false);

  useEffect(() => {
    if(colorScheme == 'dark'){
      setThemeContextColor(true);
    }
  }, [])

  return(
    <ThemeContext.Provider value={ThemeContextColor} >
      {children}
    </ThemeContext.Provider>
  );
}

