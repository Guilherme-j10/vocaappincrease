import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { BackgroundColor, ColorMain } from '../../utils/Constants';
import { Entypo } from '@expo/vector-icons';
import ContentModal from '../../components/SetTextModal/index';
import { TextContext } from '../../context/TextProvider';
import { FontAwesome } from '@expo/vector-icons';

const ComponentText = ({ index, dados, edit, Redirect }) => {
  
  const [ Load, setLoad ] = useState(false);
  const [ f, g, h, j, t, y, u, p, AllTexts, RemoveTextFromIndex ] = useContext(TextContext);

  const RemoveText = (index) => {
    setLoad(true);
    RemoveTextFromIndex(index, () => {
      setLoad(false);
    })
  }

  return(
    <TouchableOpacity style={{
      width: '100%',
      paddingHorizontal: 15,
      paddingVertical:  15,
      backgroundColor: ColorMain,
      marginBottom: 5,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }} onPress={() => Redirect({ title: dados.title, text: dados.text.split(' ') })}>
      <Text style={{color: '#fff', fontWeight: 'bold', overflow: 'hidden', width: '80%'}}>{dados.title}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => { RemoveText(index) }}>
          {Load ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <FontAwesome name="trash-o" size={24} color={BackgroundColor} />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{
          marginLeft: 15
        }} onPress={() => edit({title: dados.title, text: dados.text, index: index}) }>
          <FontAwesome name="pencil" size={24} color={BackgroundColor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const TextsComponents = ({ navigation }) => {

  const [ ShowModal, setShowModal ] = useState(false);
  const [ f, g, h, j, t, y, u, p, AllTexts ] = useContext(TextContext);
  const [ InfortmationText, setInfortmationText ] = useState(null);

  const EditMethod = (ObjToSedn) => {
    setInfortmationText(ObjToSedn);
    setShowModal(true);
  }

  const RedirectTo = (dados) => {
    navigation.navigate('Home', {dados})
  }

  return(
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: BackgroundColor,
      paddingHorizontal: 25,
      paddingVertical: 25
    }}>
      <View style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          fontWeight: 'bold',
          color: '#444',
          fontSize: 20
        }}>Voca Increase</Text>
      </View>
      <ScrollView contentContainerStyle={{
        marginTop: 30
      }}>
        {AllTexts.length == 0 ? (
          <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Entypo name="emoji-sad" size={24} color="#666" />
            <Text style={{
              color: '#666',
              marginLeft: 10
            }}>you still don't have any text.</Text>
          </View>
        ) : AllTexts.map((dados, index) => (
          <ComponentText key={index} index={index} dados={dados} edit={EditMethod} Redirect={RedirectTo} />
        ))}
      </ScrollView>

      <Modal 
        animationType="slide"
        transparent={true}
        visible={ShowModal}
      >
        <ContentModal setShowModal={setShowModal} dados={InfortmationText} setDados={setInfortmationText} />
      </Modal>

      {/* BOTÃO PARA ADICIONAR UM TEXTO */}
      <TouchableOpacity style={{
        position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 15,
        right: 15,
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: ColorMain,
        justifyContent: 'center',
        alignItems: 'center'
      }} onPress={() => { setShowModal(true) }}>
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default TextsComponents;