import React, { useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { TextContext } from '../../context/TextProvider';
import { ColorMain } from '../../utils/Constants';

const TextStringComponent = ({ methodGet }) => {

  const [ Content, l, k, Provisinament ] = useContext(TextContext);

  useEffect(() => {
    //console.log(Provisinament);
  }, [Provisinament])

  return(
    <Text style={{flex: 1}}>
      {(() => {
        let elements = [];
        for(let z = 0; z < Content.length; ++z){
          elements.push(
            <Text style={{color: (() => {
              if(Provisinament.length > 0){
                for(let y = 0; y < Provisinament.length; ++y){
                  if(Provisinament[y].word == Content[z]){
                    return true;
                  }
                }
              }else{
                return false;
              }
            })() ? ColorMain : '#666', fontSize: 15}} key={z} onPress={() => { methodGet(Content[z]) }} >
              {`${Content[z]} `}
            </Text>
          );
        }
        return elements;
      })()}
      {/* {Content.map((Word, index) => (
        <Text style={{color: '#666', fontSize: 15}} key={index} onPress={() => { methodGet(Word) }} >
          {`${Word} `}
        </Text>
      ))} */}
    </Text>
  );
}

export default TextStringComponent;