import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';

export default function Loading() {
    return (
        <ImageBackground
      source = {require('./assets/donkas2.png')}
      style={styles.container}>
        <View style = {styles.container}>
          <StatusBar barStyle="dark-content"/>
          <Text style={styles.text}>노인을 </Text>
          <Text style={styles.text}>위한 </Text>
          <Text style={styles.text}>나라는</Text>
          <Text style={styles.text}>없다</Text>

        </View>

      </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      paddingHorizontal: 30,
      paddingVertical: 60,
          
    },
    text:{
      color: "#F0F0F0",
      fontSize:50,
       
    }
  });
  