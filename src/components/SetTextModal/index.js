import React, { useEffect, useState, useContext, useCallback } from 'react';
import { View, Keyboard, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; 
import { ColorMain } from '../../utils/Constants';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextContext } from '../../context/TextProvider';

const SetTextModal = ({ setShowModal }) => {

  const [ keyboardStatus, setKeyboardStatus ] = useState(false);
  const [ TextContentToShow, update ] = useContext(TextContext);
  const [ TextOfInput, setTextOfInput ] = useState('');
  const [ LoadMakeText, setLoadMakeText ] = useState(false);

  useEffect(() => {
    setTextOfInput(TextContentToShow.join(' '))
    Keyboard.addListener("keyboardDidShow", () => { 
      setKeyboardStatus(true);
    }); 
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
  }, []);

  const saveTextonSystem = async () => {
    setLoadMakeText(true);
    try {
      await AsyncStorage.setItem('TextInputSystem', TextOfInput ? TextOfInput : ' ');
      setLoadMakeText(false);
      setShowModal(false);
      update();
    } catch (error) {
      console.log(error);
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
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 5
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
            height: keyboardStatus ? 350 : 600,
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 10
          }} 
          multiline={true}
          textAlignVertical="top"
          onChangeText={(e) => { setTextOfInput(e); console.log(e); }}
          value={TextOfInput}
        />
        <TouchableOpacity style={{
          backgroundColor: ColorMain,
          height: 45,
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