import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import TextString from '../../components/Text/index';
import { ColorMain } from '../../utils/Constants';

const Home = () => {
  return(
    <SafeAreaView style={{flex: 1, backgroundColor: '#111'}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal: 25,
        paddingVertical: 25,
        paddingBottom: 65,
        backgroundColor: '#111',
      }}>
        <View style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>Vocal Increase</Text>
          <TouchableOpacity style={{
            backgroundColor: ColorMain,
            paddingHorizontal: 10,
            paddingVertical: 7,
            width: 120,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center' 
          }}>
            <Text  style={{color: '#fff'}}>Load Text</Text>
          </TouchableOpacity>
        </View>
        <TextString />
      </ScrollView>

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
      }} >
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}} >Tx</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Home;