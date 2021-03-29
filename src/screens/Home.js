import React from 'react';
import { render } from 'react-dom';
import { View, Button, TouchableOpacity, LinearLayout, Text, StyleSheet, ScrollView, Dimensions, FlexBox } from 'react-native';
import { withOrientation } from 'react-navigation';
var menus = [
  [
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
  ],
  [
    {
      id: 1,
      img: '',
      menu: '사이다',
      price:10000
    },
    {
      id: 2,
      img: '',
      menu: '콜라',
      price:12000
    },
    {
      id: 3,
      img: '',
      menu: '이동준',
      price:12000
    },

    {
      id: 4,
      img: '',
      menu: '이동준1',
      price:12000
    }
  ]
]

var categorys = [
  '카테고리1', '카테고리2'
]

var cart1 = []
var cart2 = []

class Home extends React.Component{
  constructor(props){
    super(props);
    this.onPressCat = this.onPressCat.bind(this);
  }

  state = { category: 0,
    cart: [{
      menu: '돈까스',
      qty: 2,
      price: 10000
    },
    {
      menu: '치즈돈까스',
      qty: 2,
      price: 12000
    }],
  };
  printMenus(menu){
    if(menu.id%2==0) {
    return;
    }
    else{
      return (
        <TouchableOpacity style={styles.menu} onPress={()=>{this.onPressMenu(menu.menu, menu.price)}}>
        <View>
          <Text>{menu.menu}</Text>
        </View>
        <View>
          <Text>{menu.price}원</Text>
        </View>
      </TouchableOpacity>
      );
    }
  }
  printMenus2(menu){
    if(menu.id%2==0) {
    return (
      <TouchableOpacity style={styles.menu} onPress={()=>{this.onPressMenu(menu.menu, menu.price)}}>
        <View>
          <Text>{menu.menu}</Text>
        </View>
        <View>
          <Text>{menu.price}원</Text>
        </View>
      </TouchableOpacity>
          );
    }
    else{
      return;
    }
  }
  onPressMenu(menu, price){
    var tempCart = this.state.cart;

    tempCart.push({
    menu: menu,
    qty: 1,
    price: price
    });
    this.setState({cart:tempCart})
  }

  onPressCat(index){
    this.setState({
      category:index,
    }
    )
  }
  buttonRenderer(){
    var temp = categorys.map((category, index)=>(
      <View>
        <Button onPress={()=>{this.onPressCat(index)}} style={{padding:10}} title={category}></Button>
      </View>
    ));
    return temp;
  }
  
  render() {
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
          {/* {
            categorys.map(function(element, index, category){
              return (
              );
            })
          } */}

          {this.buttonRenderer()}
        </View>
          <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, backgroundColor: 'rgb(242, 242, 247)'}}>

            <View>
              <View style={styles.menuContainer}>
                {menus[this.state.category].map(menu=>(
                  this.printMenus(menu)
                ))}
              </View>
              <View style={styles.menuContainer}>
                {menus[this.state.category].map(menu=>(
                  this.printMenus2(menu)
                ))}
              </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.order}>
              {this.state.cart.map(cart=>(
                <View style={{margin:10}}>
                  <Text style={{fontSize:30}}>{cart.menu}</Text>
                  <Text style={{fontSize:20, textAlign:'right'}}>{cart.qty}개 - {cart.qty*cart.price}원</Text>
                </View>
              ))}
              <View style={styles.orderButtonContainer}>
                <Text style={{fontSize:30, textAlign:'right', margin:10}}>60000원</Text>
                <Button title="주문하기"/>
              </View>
            </ScrollView>
        </View>
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
  },
  header:{
    flexDirection:'row'
  }
});

export default Home;
