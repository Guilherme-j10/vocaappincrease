import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Modal } from 'react-native';
import TextString from '../../components/Text/index';
import { ColorMain, BackgroundColor } from '../../utils/Constants';
import Animated, { useAnimatedStyle, withTiming, useSharedValue, interpolate, Extrapolate, color } from 'react-native-reanimated';
import { api } from '../../utils/api';
import ContentModal from '../../components/SetTextModal/index';
import { TextContext } from '../../context/TextProvider';

const Home = ({ route, navigation }) => {

  const [ ShowBox, setShowBox ] = useState(false);
  const [ TextWord, setTextWord ] = useState(null);
  const Position = useSharedValue(70);
  const [ ShowModal, setShowModal ] = useState(false);
  const [ x, z, SaveInfotmation, Provisinament, StillHidden, setStillHidden ] = useContext(TextContext);
  const { dados } = route.params;

  useEffect(() => {
    if(ShowBox){
      Position.value = 0;
    }else{
      Position.value = 70;
    }
  }, [ShowBox]);

  const ShownAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(Position.value, { duration: 100 }) }],
      opacity: interpolate(
        Position.value,
        [70, 35, 0],
        [0, 1, 1],
        Extrapolate.CLAMP
      )
    };
  });

  const GetWordInformation = async (Palavra) => {
    if(!ShowBox){
      setShowBox(true);
      try {
        const response = await api.post('/translate', {
          word: Palavra
        });
        if(response.data){
          setTextWord(`${Palavra} - ${response.data}`);
          SaveInfotmation({
            word: Palavra,
            mean: response.data
          });
          setTimeout(() => {
            setShowBox(false);
            setTextWord(null);
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return(
    <SafeAreaView style={{flex: 1, backgroundColor: BackgroundColor}}>
      <View style={{
        width: '100%',
        paddingHorizontal: 25,
        paddingVertical: 25,
        paddingBottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Text style={{color: '#444', fontSize: 20, fontWeight: 'bold'}}>{dados.title}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal: 25,
        paddingVertical: 25,
        paddingTop: 0,
        paddingBottom: 80,
        backgroundColor: BackgroundColor,
      }}>
        <TextString methodGet={GetWordInformation} TextContent={dados.text} />
      </ScrollView>

      <Animated.View style={[{
        bottom: 15,
        left: 25,
        height: 50,
        width: '73.5%',
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: ColorMain,
        borderRadius: 5,
        alignItems: 'flex-start',
        justifyContent: 'center'
      }, ShownAnimation]}>
        <View style={{
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          {TextWord ? (
            <Text style={{marginLeft: 10, color: '#fff'}}>{TextWord}</Text>
          ) : (
            <>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={{marginLeft: 10, color: '#fff'}}>Buscando palavra...</Text>
            </>
          )}
        </View>
      </Animated.View>

      <TouchableOpacity style={{
        backgroundColor: ColorMain,
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15,
        bottom: 15,
        alignSelf: 'flex-end',
      }} onPress={() => {
        navigation.navigate('Means');
        setStillHidden(0);
      }}>
        <View style={{position: 'absolute', borderColor: '#fff', borderWidth: 2, top: -10, right: 0, width: 23, borderRadius: 50, justifyContent: 'center', alignItems: 'center', height: 23, backgroundColor: ColorMain }}>
          <Text style={{color: '#fff'}}>{StillHidden}</Text>
        </View>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}} >Tx</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Home;