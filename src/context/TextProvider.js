import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TextContext = createContext();
export const TextProvider = ({ children }) => {

  const [ TextContentToShow, setTextContentToShow ] = useState([]);
  const [ Provisinament, setProvisinament ] = useState([]);
  const [ StillHidden, setStillHidden ] = useState(0);

  const UpdateText = async () => {
    try {
      const value = (await AsyncStorage.getItem('TextInputSystem')).split(' ');
      setTextContentToShow(value);
    } catch (error) {
      console.log(error);
    }
  }

  const SaveInformationTranslated = async (ObjInfomation) => {
    try {
      const getValue = await AsyncStorage.getItem('InformationWords');
      if(!getValue){
        await AsyncStorage.setItem('InformationWords', JSON.stringify([ObjInfomation]))
      }else{
        let oldInformation = JSON.parse(getValue);
        oldInformation.push(ObjInfomation);
        await AsyncStorage.setItem('InformationWords', JSON.stringify(oldInformation));
      }

      GetInfomationWords();
      setStillHidden(StillHidden + 1);
    } catch (error) {
      console.log(error);
    }
  }

  const RemoveTranslate = async (index, CallBack) => {
    try {
      const values = JSON.parse(await AsyncStorage.getItem('InformationWords')).reverse();
      values.splice(index, 1);
      await AsyncStorage.setItem('InformationWords', JSON.stringify(values.reverse()));
      setTimeout(() => {
        GetInfomationWords();
        CallBack();
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  }

  const GetInfomationWords = async () => {
    try {
      const value = await AsyncStorage.getItem('InformationWords');
      setProvisinament(JSON.parse(value).reverse());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    UpdateText();
    GetInfomationWords();
  }, [])

  return(
    <TextContext.Provider value={[
      TextContentToShow, 
      UpdateText, 
      SaveInformationTranslated, 
      Provisinament,
      StillHidden,
      setStillHidden,
      RemoveTranslate
    ]}>  
      {children}
    </TextContext.Provider>
  );
}