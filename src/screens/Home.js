import React from 'react';
import { View, Button, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { withOrientation } from 'react-navigation';

const Home = () => {
  return (
    <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, backgroundColor: 'rgb(242, 242, 247)'}}>
      <View>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
          <View style={styles.menu}>
                <Text>menu</Text>
                
          </View>
        </View>
      </View>
      <View style={styles.order}>
        <View>
          <Text style={{fontSize:20}}>menu1</Text>
          <Text style={{fontSize:20}}>1개 20000원</Text>
        </View>
        <View>
          <Text style={{fontSize:20}}>menu1</Text>
          <Text style={{fontSize:20}}>1개 20000원</Text>
        </View>
        <View>
          <Text style={{fontSize:20}}>menu1</Text>
          <Text style={{fontSize:20}}>1개 20000원</Text>
        </View>
        <View>
          <Text style={{fontSize:20}}>menu1</Text>
          <Text style={{fontSize:20}}>1개 20000원</Text>
        </View>
        <View>
          <Text style={{fontSize:20}}>menu1</Text>
          <Text style={{fontSize:20}}>1개 20000원</Text>
        </View>
        <View>
          <Text style={{fontSize:20}}>menu1</Text>
          <Text style={{fontSize:20}}>1개 20000원</Text>
        </View>
        <View style={styles.orderButtonContainer}>
          <Button title="버튼"/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  order:{
    backgroundColor: 'white',
    height: '62%',
    width: '35%',
    top: 0,
    marginTop:0, 
    right:1,
    left:'65%',
    flex: 1,
    borderRadius: 5,
    position: 'absolute'
  },
  menu:{
    backgroundColor: 'white',
    margin:10,
    borderRadius: 5,
    width: '50%',
    height:300
  },
  menuContainer:{
    flexDirection:'row',flex: 2, justifyContent: 'center', alignItems: 'center', width:'60%',
    marginLeft:20
  },
  orderButtonContainer:{
    marginTop:'auto',
    marginBottom:20,
  }
});

export default Home;
