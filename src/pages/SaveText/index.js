import React, { useEffect, useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'; 
import { ColorMain } from '../../utils/Constants';
import { FontAwesome } from '@expo/vector-icons';
import { TextContext } from '../../context/TextProvider';
import { ThemeContext } from '../../context/ThemeContext';

const SetTextModal = ({ route, navigation, setShowModal, dados }) => {

  const Theme = useContext(ThemeContext);
  const [ keyboardStatus, setKeyboardStatus ] = useState(false);
  const [ g, h, r, t, y, u, i, SaveTextOnList, w, z, UpdateTextOnly ] = useContext(TextContext);
  const [ TextOfInput, setTextOfInput ] = useState('');
  const [ TitleInput, setTitleInput ] = useState('');
  const [ LoadMakeText, setLoadMakeText ] = useState(false);
  const Dados = route.params;

  useEffect(() => {
    if(Dados){
      setTextOfInput(Dados.ObjToSedn.text);
      setTitleInput(Dados.ObjToSedn.title);
    }
  }, []);

  const saveTextonSystem = async () => {
    setLoadMakeText(true);
    if(Dados){
      UpdateTextOnly({
        index: Dados.ObjToSedn.index,
        title: TitleInput,
        text: TextOfInput
      }, () => {
        setLoadMakeText(false);
        navigation.goBack();
      });
    }else{
      SaveTextOnList({
        title: TitleInput,
        text: TextOfInput
      }, () => {
        setLoadMakeText(false);
        setTextOfInput('');
        setTitleInput('');
        navigation.goBack();
      });
    }
    
  }

  return(
    <SafeAreaView style={{
      width: '100%',
      backgroundColor: Theme ? '#000' : '#fff',
      flex: 1,
      paddingVertical: 25,
      paddingHorizontal: 25
    }}>
      <View style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
      }}>
        <Text style={{
          fontWeight: 'bold',
          color: Theme ? '#fff' : '#444',
          fontSize: 20
        }}>Load Text</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <TextInput 
          style={{
            width: '100%',
            borderColor: Theme ? '#333' : '#ccc',
            borderWidth: 1,
            marginBottom: 15,
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 10,
            color: Theme ? '#fff' : '#555'
          }}
          placeholder="Type on here the title text"
          placeholderTextColor={Theme ? '#ccc' : '#666'}
          onChangeText={(e) => setTitleInput(e)}
          value={TitleInput}
        />
        <TextInput
          style={{
            width: '100%',
            borderColor: Theme ? '#333' : '#ccc',
            borderWidth: 1,
            height: 520,
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 10,
            color: Theme ? '#fff' : '#555'
          }} 
          multiline={true}
          textAlignVertical="top"
          onChangeText={(e) => { setTextOfInput(e); }}
          value={TextOfInput}
          placeholderTextColor={Theme ? '#ccc' : '#666'}
          placeholder="Type on here the text"
        /> 
        <TouchableOpacity style={{
          width: '100%',
          backgroundColor: ColorMain,
          height: 50,
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
      </ScrollView>
    </SafeAreaView>
  );
}

export default SetTextModal;