import * as React from 'react';
import { SafeAreaView, Dimensions, Button, Text, View, StyleSheet, Image, TouchableOpacity, TextBase, TextInput, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import react from 'react';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import socketio from 'socket.io-client';
import { FlatList } from 'react-native-gesture-handler';

const DetailsTopTab = createMaterialTopTabNavigator();


class DetailsMaterialScreen extends React.Component {
    render() {
    const { route } = this.props;
    const { itemId, otherParam } = route.params;
      return (
        <DetailsTopTab.Navigator>
          <DetailsTopTab.Screen name="경기 내용" component={DetailsScreen}
          initialParams={{'itemId':itemId, 'otherParam': otherParam}}/>
  
        <DetailsTopTab.Screen name="응원 하기" component={ChatScreen}
          initialParams={{'itemId':itemId, 'otherParam': otherParam}}/> 
        </DetailsTopTab.Navigator>
      );
    }
  }
  
  class ChatScreen extends React.Component{
    
    render() {
      const { route } = this.props;
      const { itemId, otherParam } = route.params;
  
      return(
        <SafeAreaView style={styles.container}>
            Chat?
        </SafeAreaView>
      );
    }
  }

  
  
  
  class DetailsScreen extends React.Component {
    render() {
     return (
        <ScrollView>
        Details
        </ScrollView>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.005)',
      alignItems: 'center',
      marginBottom: 10
    },
    scoreContainer: {
      backgroundColor: 'white',
      flexDirection: 'row',
      paddingBottom: 10,
      width: '100%',
      paddingTop: 15
    },
    score: {
      fontSize: 30,
      margin: 30
    },
    detailsContainer:{
      maxWidth: 1200,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.12)',
      width: '95%',
      padding: 10,
      borderRadius: 10, 
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    small: {
      fontSize:13
    },
    listHeader: {
      width:'100%',
      paddingBottom:10,
      borderBottomWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    infoContainer:{
      flexDirection: 'row',
      padding: 5,
    },
    input: {
      width: '90%',
      padding: 10,
      marginRight: 5,
      marginLeft: 0,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.12)',
      borderRadius:5,
    },
    chatContainer: {
      backgroundColor: 'rgba(255, 45, 85, 0.22)',
      borderRadius: 5,
      padding:10,
      marginRight:'auto',
      marginTop:10,
    },
    myChatContainer:{
      backgroundColor: 'rgba(0, 122, 255, 0.22)',
      borderRadius: 5,
      padding:10,
      marginLeft:'auto',
      marginTop:10,
    },
    subText:{
      color: 'rgba(0, 0, 0, 0.8)',
      marginTop:8
    },
    subTextWhite:{
      color: 'rgba(0, 0, 0, 0.8)',
      marginTop:8, 
      textAlign:'right',
    },
    submitButton:{
      width:'10%',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 122, 255, 1)',
    },
    submitButtonText:{
      alignItems: 'stretch',
      color: 'white'
    },
    teamButton: {
      width: '49%',
      height: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255, 45, 85, 1)',
      backgroundColor: 'white',
      borderColor: 'rgba(255, 45, 85, 1)',
      borderWidth: 1,
      marginBottom: 10,
    },
    selectedTeamButton: {
      width: '49%',
      height: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 45, 85, 1)',
      borderColor: 'rgba(255, 45, 85, 1)',
      borderWidth: 1,
      marginBottom: 10,
    },
    awayTeamButton: {
      width: '49%',
      height: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(0, 122, 255, 1)',
      backgroundColor: 'white',
      borderColor: 'rgba(0, 122, 255, 1)',
      borderWidth: 1,
      marginBottom: 10,
    },
    awaySelectedTeamButton: {
      width: '49%',
      height: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 122, 255, 1)',
      borderColor: 'rgba(0, 122, 255, 1)',
      borderWidth: 1,
      marginBottom: 10,
    },
  });

  export default DetailsMaterialScreen;