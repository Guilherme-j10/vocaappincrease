import React, { useEffect, useContext } from 'react';
import { Text } from 'react-native';
import { TextContext } from '../../context/TextProvider';
import { ColorMain } from '../../utils/Constants';

const TextStringComponent = ({ methodGet, TextContent }) => {

  const [ Content, l, k, Provisinament ] = useContext(TextContext);

  return(
    <Text style={{flex: 1}}>
      {(() => {
        let elements = [];
        for(let z = 0; z < TextContent.length; ++z){
          elements.push(
            <Text style={{color: (() => {
              if(Provisinament.length > 0){
                for(let y = 0; y < Provisinament.length; ++y){
                  if(Provisinament[y].word == TextContent[z]){
                    return true;
                  }
                }
              }else{
                return false;
              }
            })() ? ColorMain : '#666', fontSize: 15}} key={z} onPress={() => { methodGet(TextContent[z]) }} >
              {`${TextContent[z]} `}
            </Text>
          );
        }
        return elements;
      })()}
    </Text>
  );
}

export default TextStringComponent;