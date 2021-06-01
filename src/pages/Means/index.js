import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BackgroundColor, ColorMain } from '../../utils/Constants';
import { TextContext } from '../../context/TextProvider';
import { FontAwesome } from '@expo/vector-icons';

const Line = ({ dados, index }) => {

  const [ x, z, t, w, h, j, RemoveTranslate ] = useContext(TextContext);
  const [ Load, setLoad ] = useState(false);

  const RemoveWord = (index) => {
    setLoad(true);
    RemoveTranslate(index, () => {
      setLoad(false);
    })
  }

  return(
    <View style={{
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical:  15,
      backgroundColor: ColorMain,
      marginBottom: 5,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Text style={{color: '#fff', fontWeight: 'bold', overflow: 'hidden', width: '90%'}}>{`${dados.word} - ${dados.mean}`}</Text>
      <TouchableOpacity onPress={() => { RemoveWord(index) }}>
        {Load ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <FontAwesome name="trash-o" size={24} color={BackgroundColor} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const Means = () => {

  const [ x, z, t, Provisinament, h, j, RemoveTranslate ] = useContext(TextContext);

  return(
    <View style={{
      flex: 1,
      backgroundColor: BackgroundColor
    }}>
      <View style={{
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
      }}>
        <Text style={{fontWeight: 'bold', color: '#444', fontSize: 20}} >Means of the word</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingTop: 0 
      }}>
        {Provisinament.map((dados, index) => (
          <Line key={index} dados={dados} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Means;