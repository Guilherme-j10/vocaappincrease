import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextContext } from '../../context/TextProvider';

const TextStringComponent = ({ methodGet, content, verifiedString }) => {

  const [ Content ] = useContext(TextContext);

  return(
    <Text style={{flex: 1}}>
      {Content.map((Word, index) => (
        <Text style={{color: '#666', fontSize: 15}} key={index} onPress={() => { methodGet(Word) }} >
          {`${Word} `}
        </Text>
      ))}
    </Text>
  );
}

export default TextStringComponent;