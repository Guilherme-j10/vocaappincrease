import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const TextStringComponent = ({ methodGet, verifiedString }) => {
  
  const [ TextString, setTextString ] = useState('Prepared by exy. Take the multiple-choice quiz following each text, and you ll get the results immediately. You will feel both challenged and accomplished! You can even download (as PDF) and print the texts and exercises. It s enjoyable, fun and free. Good luck! Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately. You will feel both challenged and accomplished! You can even download (as PDF) and print the texts and exercises. It s enjoyable, fun and free. Good luck! Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately. You will feel both challenged and accomplished! You can even download (as PDF) and print the texts and exercises. It s enjoyable, fun and free. Good luck! Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately. You will feel both challenged and accomplished! You can even download (as PDF) and print the texts and exercises. It s enjoyable, fun and free. Good luck!');

  return(
    <Text>
      {(() => {
        const TextStringSplitted = TextString.split(' ');
        let arr = [];
        for(let i = 0; i < TextStringSplitted.length; ++i){
          arr.push(
            <TouchableOpacity key={i} onPress={() => {
              console.log(verifiedString); //retornando undefined.
              if(!verifiedString){
                methodGet(TextStringSplitted[i])
              }else{
                console.log('ta fazendo ainda');
              }
            }}>
              <Text style={{color: '#666', fontSize: 15}} >{`${TextStringSplitted[i]} `}</Text>
            </TouchableOpacity>
          );
        }
        return arr;
      })()}
    </Text>
  );
}

export default TextStringComponent;