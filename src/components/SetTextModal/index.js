import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Keyboard, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; 
import { ColorMain } from '../../utils/Constants';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextContext } from '../../context/TextProvider';

const SetTextModal = ({ setShowModal, dados, setDados }) => {

  const [ keyboardStatus, setKeyboardStatus ] = useState(false);
  const [ g, h, r, t, y, u, i, SaveTextOnList, w, z, UpdateTextOnly ] = useContext(TextContext);
  const [ TextOfInput, setTextOfInput ] = useState('');
  const [ TitleInput, setTitleInput ] = useState('');
  const [ LoadMakeText, setLoadMakeText ] = useState(false);

  useEffect(() => {
    if(dados){
      setTextOfInput(dados.text);
      setTitleInput(dados.title);
    }

    Keyboard.addListener("keyboardDidShow", () => { 
      setKeyboardStatus(true);
    }); 
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", () => { 
        setKeyboardStatus(true);
      }); 
      Keyboard.removeAllListeners("keyboardDidHide", () => {
        setKeyboardStatus(false);
      });
    }
  }, []);

  const saveTextonSystem = async () => {
    setLoadMakeText(true);
    if(dados){
      UpdateTextOnly({
        index: dados.index,
        title: TitleInput,
        text: TextOfInput
      }, () => {
        setLoadMakeText(false);
        setShowModal(false);
        setDados(null);
      });
    }else{
      SaveTextOnList({
        title: TitleInput,
        text: TextOfInput
      }, () => {
        setLoadMakeText(false);
        setTextOfInput('');
        setTitleInput('');
        setShowModal(false);
      });
    }
    
  }

  return(
    <View style={{
      width: '100%',
      backgroundColor: '#1111112d',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <View style={{
        width: '90%',
        maxHeight: keyboardStatus ? '90%' : '80%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
        }}>
          <Text style={{color: '#444', fontWeight: 'bold', fontSize: 18}}>Load the text</Text>
          <FontAwesome name="times" size={24} color="black" onPress={() => { setShowModal(false) }} />
        </View>
        <TextInput 
          style={{
            width: '100%',
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 15,
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
          placeholder="Type on here the title text"
          onChangeText={(e) => setTitleInput(e)}
          value={TitleInput}
        />
        <TextInput
          style={{
            width: '100%',
            borderColor: '#ccc',
            borderWidth: 1,
            height: keyboardStatus ? '57%' : '72.5%',
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 10
          }} 
          multiline={true}
          textAlignVertical="top"
          onChangeText={(e) => { setTextOfInput(e); }}
          value={TextOfInput}
          placeholder="Type on here the text"
        />
        <TouchableOpacity style={{
          width: '100%',
          backgroundColor: ColorMain,
          height: keyboardStatus ? '13%' : '8%',
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          marginTop: 10
        }} onPress={() => { saveTextonSystem() }}>
          {LoadMakeText ? (
            <ActivityIndicator color="#fff" size={20} />
          ) : (
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Set up text</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SetTextModal;