import React from 'react';
import { render } from 'react-dom';
import { View, Button, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { withOrientation } from 'react-navigation';
var menus = [
  {
    id: 1,
    img: '',
    menu: '돈까스',
    price:10000
  },
  {
    id: 2,
    img: '',
    menu: '치즈돈까스',
    price:12000
  },
  {
    id: 3,
    img: '',
    menu: '매운돈까스',
    price:12000
  }
]

var cart = [
  {
    menu: '돈까스',
    qty: 2,
    price: 10000
  },
  {
    menu: '치즈돈까스',
    qty: 2,
    price: 12000
  }
]
var cart1 = []
var cart2 = []

class Home extends React.Component{
  printMenus(menu){
    if(menu.id%2==0) {
    return;
    }
    else{
      return (
        <View style={styles.menu}>
        <View>
          <Text>{menu.menu}</Text>
        </View>
        <View>
          <Text>{menu.price}원</Text>
        </View>
      </View>
      );
    }
  }
  printMenus2(menu){
    if(menu.id%2==0) {
    return (
      <View style={styles.menu}>
        <View>
          <Text>{menu.menu}</Text>
        </View>
        <View>
          <Text>{menu.price}원</Text>
        </View>
      </View>
          );
    }
    else{
      return;
    }
  }
  render() {
    return(
      <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, backgroundColor: 'rgb(242, 242, 247)'}}>
        <View>
          <View style={styles.menuContainer}>
            {menus.map(menu=>(
              this.printMenus(menu)
            ))}
          </View>
          <View style={styles.menuContainer}>
            {menus.map(menu=>(
              this.printMenus2(menu)
            ))}
          </View>
        </View>
        <View style={styles.order}>
          {cart.map(cart=>(
            <View style={{margin:10}}>
              <Text style={{fontSize:30}}>{cart.menu}</Text>
              <Text style={{fontSize:20, textAlign:'right'}}>{cart.qty}개 - {cart.qty*cart.price}원</Text>
            </View>
          ))}
          <View style={styles.orderButtonContainer}>
            <Text style={{fontSize:30, textAlign:'right', margin:10}}>60000원</Text>
            <Button title="주문하기"/>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const chartHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  order:{
    backgroundColor: 'white',
    height: chartHeight,
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
    width: '47%',
    height:300
  },
  menuContainer:{
    flexDirection:'row',
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'61%',
    marginLeft:15,
    overflow: 'scroll'
  },
  orderButtonContainer:{
    marginTop:'auto',
    marginBottom:20,
  }
});

export default Home;
