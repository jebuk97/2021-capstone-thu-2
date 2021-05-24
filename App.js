import React, { Component, StyleSheet } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginStackScreen from './src/login/LoginScreen';
import Table from './src/login/selectTable';
import Home from './App2'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
              <Stack.Screen name="Login" component={LoginStackScreen} />
              <Stack.Screen name="Table" component={Table} />
              <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
