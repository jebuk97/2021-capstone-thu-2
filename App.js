import React, { Component } from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStackScreen from './src/login/LoginScreen';
import Table from './src/login/selectTable';
import Home from './App2';
import Admin from './src/screens/Admin';
import TableDetails from './src/screens/TableDetails';

import { LogBox } from 'react-native';


const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false,
            headerLeft: null,
            gestureEnabled: false,
          }}>
              <Stack.Screen name="Login" component={LoginStackScreen} />
              <Stack.Screen name="Table" component={Table} />
              <Stack.Screen name="TableDetails" component={TableDetails} />
              <Stack.Screen name="Admin" component={Admin} />
              <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
