import React, {createContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import './global'

import Navigation from './src/navigation/NavigationStack';
export default function App({route, navigation}) {
  const { num } = route.params;
  global.tableNo = num;
  return (
    <View style={styles.container}>
      <Navigation num = {num} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
  },
});