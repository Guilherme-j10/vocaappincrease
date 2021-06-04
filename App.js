import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { ColorMain } from './src/utils/Constants';
import { TextProvider } from './src/context/TextProvider';
import HomeScreen from './src/pages/Home/index';
import MeansScreen from './src/pages/Means/index';
import SaveTextScreen from './src/pages/SaveText/index';
import TextsScreen from './src/pages/Texts/index';
import { ThemeProvider } from './src/context/ThemeContext';
const Stack  = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={ColorMain} translucent={false} style="light" />
      <ThemeProvider>
        <TextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Texts" screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS
            }}>
              <Stack.Screen name="Texts" component={TextsScreen} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Means" component={MeansScreen} />
              <Stack.Screen name="SaveText" component={SaveTextScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </TextProvider>
      </ThemeProvider>
    </>
  );
}
