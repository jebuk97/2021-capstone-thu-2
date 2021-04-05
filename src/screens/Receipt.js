import React from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var orders= [];
var sumPrice = 0;
var sumQty = 0;
const primaryColor = 'rgb(0, 122, 255)';

class Home extends React.Component {
    constructor(props){
        super(props);
        orders=[{
            menu: '돈까스',
            qty: 1,
            price: 8000
        },
        {
            menu: '치즈돈까스',
            qty: 2,
            price: 8000
        }]
        sumPrice=this.sumPriceHandler();
        sumQty=this.sumQtyHandler();
    }
    sumPriceHandler(){
        var sum = 0;
        for(var i=0;i<orders.length;i++){
          sum += orders[i].price * orders[i].qty;
        }
        return sum;
      }
      sumQtyHandler(){
        var sum = 0;
        for(var i=0;i<orders.length;i++){
          sum += orders[i].qty;
        }
        return sum;
      }
    render(){
        return (
            <View style={{ flex: 1,padding:10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(242, 242, 247)'}}>
                <View style={[styles.container]}>

                <View flexDirection='row' style={styles.listContainer}>
                            <Text style={{width:'50%', fontSize:24}}>
                                메뉴
                            </Text>
                            <Text style={{width:'20%', fontSize:24}}>
                                수량
                            </Text>
                            <Text style={{width:'30%', fontSize:24}}>
                                가격
                            </Text>
                        </View>
                    <ScrollView>
                    {orders.map(order=>(
                        <View flexDirection='row' style={styles.listContainer}>
                            <Text style={{width:'50%', fontSize:28}}>
                                {order.menu}
                            </Text>
                            <Text style={{width:'20%', fontSize:28}}>
                                {order.qty}개
                            </Text>
                            <Text style={{width:'30%', fontSize:28}}>
                                {order.qty * order.price}원
                            </Text>
                        </View>
                    ))}
                        
                    </ScrollView>
                    <View style={[{marginBottom:10, marginTop:'auto', padding:10, paddingTop:'auto'}]}>
                    <View flexDirection='row' style={styles.listContainer}>
                            <Text style={{width:'50%', fontSize:28}}>
                                총액
                            </Text>
                            <Text style={{width:'20%', fontSize:28}}>
                                {sumQty}개
                            </Text>
                            <Text style={{width:'30%', fontSize:28, color:primaryColor}}>
                                {sumPrice}원
                            </Text>
                        </View>
                            <TouchableOpacity style={styles.button}><Text style={{color:'white', fontSize:32, textAlign:'center'}}>추가 주문하기</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderRadius:10,
        margin: 10,
        width: '80%',
        height:'100%',
    },
    listContainer:{
        margin:10,
        padding:10,
        marginRight:40,
        marginLeft:40,
        borderBottomWidth:1,
        borderBottomColor:'grey',
    },
    button:{
        borderWidth: 0,
        borderRadius:10,
        padding:10,
        margin:10,
        marginRight:40,
        marginLeft:40,
        backgroundColor:primaryColor,
      },
});
export default Home;
