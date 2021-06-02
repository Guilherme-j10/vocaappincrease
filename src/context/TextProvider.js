import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TextContext = createContext();
export const TextProvider = ({ children }) => {

  const [ TextContentToShow, setTextContentToShow ] = useState([]);
  const [ Provisinament, setProvisinament ] = useState([]);
  const [ StillHidden, setStillHidden ] = useState(0);
  const [ AllTexts, setAllTexts ] = useState([]);

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
      if(value){
        setProvisinament(JSON.parse(value).reverse());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const SaveTextOnList = async (ObjTextToSave, CallBack) => {
    try {
      const getTextToSave = await AsyncStorage.getItem('TextOnSystem');
      if(!getTextToSave){
        await AsyncStorage.setItem('TextOnSystem', JSON.stringify([ObjTextToSave]))
        CallBack();
      }else{
        let oldInformation = JSON.parse(getTextToSave);
        oldInformation.push(ObjTextToSave);
        await AsyncStorage.setItem('TextOnSystem', JSON.stringify(oldInformation));
        CallBack();
      }

      GetTextOnSystem();
    } catch (error) {
      console.log(error);
    }
  }

  const RemoveTextFromIndex = async (Index, CallBack) => {
    try {
      const values = JSON.parse(await AsyncStorage.getItem('TextOnSystem')).reverse();
      values.splice(Index, 1);
      await AsyncStorage.setItem('TextOnSystem', JSON.stringify(values.reverse()));
      setTimeout(() => {
        GetTextOnSystem();
        CallBack();
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  }

  const UpdateTextOnly = async (Dados, CallBack) => {
    try {
      const getValueOfIndex = JSON.parse(await AsyncStorage.getItem('TextOnSystem')).reverse();
      getValueOfIndex[Dados.index] = {
        title: Dados.title,
        text: Dados.text
      };
      await AsyncStorage.setItem('TextOnSystem', JSON.stringify(getValueOfIndex.reverse()));
      setTimeout(() => {
        GetTextOnSystem();
        CallBack();
      }, 500)
    } catch (error) {
      console.log(error);
    }
  }

  const GetTextOnSystem = async () => {
    try {
      const getValue = JSON.parse(await AsyncStorage.getItem('TextOnSystem')).reverse();
      if(getValue){
        setAllTexts(getValue);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    UpdateText();
    GetInfomationWords();
    GetTextOnSystem();

    return () => {
      setAllTexts([]);
      setStillHidden(0);
      setProvisinament([]);
      setTextContentToShow([]);
    }
  }, [])

  return(
    <TextContext.Provider value={[
      TextContentToShow, 
      UpdateText, 
      SaveInformationTranslated, 
      Provisinament,
      StillHidden,
      setStillHidden,
      RemoveTranslate,
      SaveTextOnList,
      AllTexts,
      RemoveTextFromIndex,
      UpdateTextOnly
    ]}>  
      {children}
    </TextContext.Provider>
  );
}