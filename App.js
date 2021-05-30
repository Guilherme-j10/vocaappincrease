import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorMain } from './src/utils/Constants';

import HomeScreen from './src/pages/Home/index';

const Stack  = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={ColorMain} translucent={false} style="light" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
