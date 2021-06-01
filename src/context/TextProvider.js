import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TextContext = createContext();
export const TextProvider = ({ children }) => {

  const [ TextContentToShow, setTextContentToShow ] = useState([]);

  const UpdateText = async () => {
    try {
      const value = (await AsyncStorage.getItem('TextInputSystem')).split(' ');
      setTextContentToShow(value);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    UpdateText();
  }, [])

  return(
    <TextContext.Provider value={[TextContentToShow, UpdateText]}>  
      {children}
    </TextContext.Provider>
  );
}