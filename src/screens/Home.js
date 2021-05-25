import React from 'react';
import { render } from 'react-dom';
import { View, Button, Image, TouchableOpacity, LinearLayout, Text, StyleSheet, ScrollView, Dimensions, FlexBox, BackHandler } from 'react-native';
import { withOrientation } from 'react-navigation';
import '../../global'

var sumPrice = 0;
var sumQty = 0;
var menus = [];
const primaryColor = 'rgb(0, 122, 255)';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.onPressCat = this.onPressCat.bind(this);
    this.state = { category: 0,
      cart: [],
      isVoice: false,
      menus: [],
      categorys: [],
      tableNo : global.tableNo,
    };
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  handleBackPress(){
    console.log("Blocking Back");
    return true;
}
  getNavigationParams(){
    let id = false;
    if(this.props.navigation.state.params) {
      id = this.props.navigation.state.params.itemId;
    }
    return id;
  }
  
  printMenus(menu){
    
    if(menu.id%2==0) {
    return;
    }
    else{
      return (
        <TouchableOpacity style={styles.menu} onPress={()=>{this.onPressMenu(menu.menu, menu.price)}}>
         <Image 
          style={{width:'100%', height:200, borderRadius:5}}
          source={{uri:menu.img}}/>
        <View>
          <Text style={{fontSize:32, padding:7, paddingTop:12, textAlign:'center'}}>{menu.menu}</Text>
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
          source={{uri:menu.img}}/>
        <View>
          <Text style={{fontSize:32, padding:7, paddingTop:12, textAlign:'center'}}>{menu.menu}</Text>
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
    var price = 0
    var tempCart = this.state.cart;
    for(var i=0;i<menus.length;i++){
      for(var j=0;j<menus[i].length;j++){
       if(menu==menus[i][j].menu){
        price = menus[i][j].price;
       }
      }
    }
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
    const categorys = this.state.categorys;
    var temp = categorys && categorys.length > 0 ? categorys.map((category, index)=>(
      <View>
        {this.state.category==index ? 
        (<TouchableOpacity onPress={()=>{this.onPressCat(index)}} style={{padding:17, borderBottomWidth:3, borderBottomColor:primaryColor}}><Text style={{fontSize:32, color:primaryColor}}>{category}</Text></TouchableOpacity>):
        (<TouchableOpacity onPress={()=>{this.onPressCat(index)}} style={{padding:17}}><Text style={{fontSize:32, color:'black'}}>{category}</Text></TouchableOpacity>)
        }
      </View>
    )):null;
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
      this.setState({cart:[]})
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
    const menus = this.state.menus;
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
          {this.buttonRenderer()}
        </View>
          <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, backgroundColor: 'rgb(242, 242, 247)'}}>

            <View>
              <View style={styles.menuContainer}>
                {menus[this.state.category]&&menus[this.state.category].length>0?menus[this.state.category].map(menu=>(
                  this.printMenus(menu)
                )):null}
              </View>
              <View style={styles.menuContainer}>
                {menus[this.state.category]&&menus[this.state.category].length>0?menus[this.state.category].map(menu=>(
                  this.printMenus2(menu)
                )):null}
              </View>
            </View>
          </ScrollView>
          <View style={styles.order}>
              <View style={{margin:20}}><Text style={{textAlign:'center', fontSize: 24}}>주문내역</Text></View>
              <ScrollView 
               ref={ref => {this.scrollView = ref}}
              onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
              style={{minHeight:'60%'}}>
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
