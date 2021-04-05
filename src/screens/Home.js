import React from 'react';
import { render } from 'react-dom';
import { View, Button, Image, TouchableOpacity, LinearLayout, Text, StyleSheet, ScrollView, Dimensions, FlexBox } from 'react-native';
import { withOrientation } from 'react-navigation';

var menus=[];
var categorys=[];
var sumPrice = 0;
var sumQty = 0;
const primaryColor = 'rgb(0, 122, 255)';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.onPressCat = this.onPressCat.bind(this);
    menus = [
      [
        {
          id: 1,
          img: '',
          menu: '돈까스',
          price:7000
        },
        {
          id: 2,
          img: '',
          menu: '치즈돈까스',
          price:9500
        },
        {
          id: 3,
          img: '',
          menu: '매운돈까스',
          price:8000
        }
      ],
      [
        {
          id: 1,
          img: '',
          menu: '사이다',
          price:1000
        },
        {
          id: 2,
          img: '',
          menu: '콜라',
          price:1000
        },
        {
          id: 3,
          img: '',
          menu: '이동준',
          price:12345
        },
    
        {
          id: 4,
          img: '',
          menu: '이동준1',
          price:67890
        }
      ]
    ]
    
    categorys = [
      '식사류', '음료'
    ]
  }

  componentDidMount(){
    console.log(this.getNavigationParams());
  }
  getNavigationParams(){
    let id = false;
    if(this.props.navigation.state.params) {
      id = this.props.navigation.state.params.itemId;
    }
    return id;
  }
  state = { category: 0,
    cart: [],
    isVoice: false,
  };
  printMenus(menu){
    
    if(menu.id%2==0) {
    return;
    }
    else{
      return (
        <TouchableOpacity style={styles.menu} onPress={()=>{this.onPressMenu(menu.menu, menu.price)}}>
         <Image 
          style={{width:'100%', height:200, borderRadius:10}}
          source={{url:'data:image/jpeg;base64,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'}}/>
        <View>
          <Text style={{fontSize:32, padding:5, textAlign:'center'}}>{menu.menu}</Text>
        </View>
        <View>
          <Text style={{fontSize:24, padding:5, color:primaryColor, textAlign:'center'}}>{menu.price}원</Text>
        </View>
      </TouchableOpacity>
      );
    }
  }
  printMenus2(menu){
    if(menu.id%2==0) {
    return (
      <TouchableOpacity style={styles.menu} onPress={()=>{this.onPressMenu(menu.menu, menu.price)}}>
        <Image 
          style={{width:'100%', height:200}}
          source={{url:'data:image/jpeg;base64,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'}}/>
        <View>
          <Text style={{fontSize:32, padding:5, textAlign:'center'}}>{menu.menu}</Text>
        </View>
        <View>
          <Text style={{fontSize:24, padding:5, color:primaryColor, textAlign:'center'}}>{menu.price}원</Text>
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
    this.setState({cart:this.isDup(tempCart, menu, price)})
  }

  isDup(cart, menu, price){
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        cart[i].qty += 1;
        return cart;
      }
    }
    cart.push({
      menu: menu,
      qty: 1,
      price: price
      });
    return cart;
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
        <TouchableOpacity onPress={()=>{this.onPressCat(index)}} style={{padding:17}}><Text style={{fontSize:32}}>{category}</Text></TouchableOpacity>
      </View>
    ));
    return temp;
  }
  
  sumPriceHandler(){
    var cart = this.state.cart;
    var sum = 0;
    for(var i=0;i<cart.length;i++){
      sum += cart[i].price * cart[i].qty;
    }
    return sum;
  }
  sumQtyHandler(){
    var cart = this.state.cart;
    var sum = 0;
    for(var i=0;i<cart.length;i++){
      sum += cart[i].qty;
    }
    return sum;
  }

  onPressDel(menu){
    this.popMenu(menu);
  }
  popMenu(menu){
    console.log(menu);
    var cart = this.state.cart;
    var cart2 = [];
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        continue;
      }
      cart2.push(cart[i]);
    }
    this.setState({cart:cart2});
  }

  handleSubmit(){
    if(this.state.cart.length!=0){
      console.log(this.state.cart);
      //서버 전송 구현
    }
    else
      console.log('pass');
  }
  onPressPlus(menu){
    var cart = this.state.cart;
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        cart[i].qty += 1;
        this.setState({cart:cart});
        break;
      }
    }
  }
  onPressMinus(menu){
    var cart = this.state.cart;
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        if(cart[i].qty>1){
          cart[i].qty -= 1;
          this.setState({cart:cart});
          break;
        } else{
          this.popMenu(menu);
          break;
        }
      }
    }
  }
  render() {
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
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
          <View style={styles.order}>
              <View style={{margin:20}}><Text style={{textAlign:'center', fontSize: 24}}>주문내역</Text></View>
              <ScrollView style={{minHeight:'60%'}}>
              {this.state.cart.map(cart=>(
                <View style={{margin:10, paddingLeft:10, paddingRight:10}}>
                  <View flexDirection='row' style={{padding:10}}>
                    <Text style={{fontSize:30, width:'90%'}}>{cart.menu}</Text>
                    <TouchableOpacity onPress={()=>this.onPressDel(cart.menu)}><Text style={{fontSize:30, color:'red', lineHeight:30, marginLeft:'auto'}}>×</Text></TouchableOpacity>
                  </View>
                  <View flexDirection='row' style={{padding:10}}>
                    <TouchableOpacity onPress={()=>this.onPressMinus(cart.menu)}><Text style={{fontSize:20, width:30, textAlign:'center'}}>-</Text></TouchableOpacity>
                    <Text style={{fontSize:20, width:30, textAlign:'center'}}>{cart.qty}</Text> 
                    <TouchableOpacity onPress={()=>this.onPressPlus(cart.menu)}><Text style={{fontSize:20, width:30, textAlign:'center'}}>+</Text></TouchableOpacity>
                    <Text style={{fontSize:20, marginLeft:'auto', color:primaryColor}}>{cart.qty*cart.price} 원</Text>
                  </View>
                </View>
              ))}
              </ScrollView>
              <View style={styles.orderButtonContainer}>
                <View flexDirection='row'>
                  <Text style={{fontSize:30, textAlign:'left', margin:10, marginRight:'auto'}}>총 수량</Text>
                  <Text style={{fontSize:30, textAlign:'right', margin:10}}>{this.sumQtyHandler()} 개</Text>
                </View>
                <View flexDirection='row'>
                  <Text style={{fontSize:30, textAlign:'left', margin:10, marginRight:'auto', color:primaryColor}}>총 금액</Text>
                  <Text style={{fontSize:30, textAlign:'right', margin:10, color:primaryColor}}>{this.sumPriceHandler()} 원</Text>
                </View>
                
                <TouchableOpacity onPress={()=>this.handleSubmit()} style={styles.button}><Text style={{color:'white',fontSize:30, textAlign:'center',}}>주문하기</Text></TouchableOpacity>
              </View>
            </View>
        </View>
    );
  }
}
const chartHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  button:{
    borderWidth: 0,
    borderRadius:10,
    padding:10,
    margin:10,
    backgroundColor: primaryColor,
  },
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
    overflow: 'scroll',
    marginTop:15
  },
  orderButtonContainer:{
    marginTop:20,
    marginBottom:20,
    padding:10
  },
  header:{
    flexDirection:'row'
  }
});

export default Home;
