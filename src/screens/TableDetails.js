import React, {useEffect, useState} from 'react';

import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

var temp2 = [];
const primaryColor = '#FF555F';
export default function TableDetails({route, navigation}) {
  const { num } = route.params;
  const [orderState, setOrderState] = useState();
  const [sum, setSum] = useState(0);
  const [qty, setQty] = useState(0);
  useEffect(async ()=> {
    setOrderState();
    await loadTables();
    sumPrice=sumPriceHandler();
    sumQty=sumQtyHandler();
    return () => {
    };
  }, []);

  async function loadTables() {
    const url = 'http://13.72.64.183:3000/order/giveorder/recovery'
    const response = await axios.get(url);
    console.log(response);
    var temp = [];
    temp2 = [];
    setSum(0);
    setQty(0);
    for(var i=0;i<response.data.result.length;i++){
      console.log(response.data.result[i]);
      temp.push(response.data.result[i]);
    }
    console.log('table loaded (temp) : ', temp)
    for(var i = 0; i < temp.length;i++){
        console.log(temp[i].tableNo, num);
        if(temp[i].tableNo != num){
            continue;
        }

        var menuTemp = {tableNo:0, menus:[]};
        menuTemp.menus.push(temp[i]);
       
        menuTemp.tableNo = temp[i].tableNo;
        console.log(checkTable(temp[i].tableNo))
        
        var index = checkTable(temp[i].tableNo)
        if(index==-1){
            temp2.push(menuTemp);
            console.log('new Table added : ', temp2);
        } else{
            var dup = isDup(temp[i].menu, index);
            console.log('duplicated?', dup);
            if(dup=='false')
                temp2[index].menus.push(temp[i]);
            else
                temp2[index].menus[dup].qty += temp[i].qty;
            console.log('new Menu added : ', temp2);
        }
    }
    setOrderState(temp2);
  }

  function isDup(menu, index){
    for(var i=0;i<temp2[index].menus.length;i++){
        if(temp2[index].menus[i].menu == menu)
            return i;
    }
    return 'false';
  }

  function checkTable(num){
    for(var i=0;i<temp2.length;i++){
        console.log('temp2[i], num : ', temp2[i].tableNo, num);
        if(temp2[i].tableNo == num){
            console.log('checked', i);
            return i;
        }
    }
    return -1;
  }
  function sumPriceHandler(){
      var sum = 0;
      for(var i=0;i<temp2[0].menus.length;i++){
        sum += temp2[0].menus[i].price * temp2[0].menus[i].qty;
      }
      setSum(sum);
    }
    function sumQtyHandler(){
      var sum = 0;
      for(var i=0;i<temp2[0].menus.length;i++){
        sum += temp2[0].menus[i].qty;
      }
      setQty(sum);
    }
    async function handlePayment(){
      //서버에 통보
      console.log('pay '+num);
      const url = 'http://13.72.64.183:3000/order/purchase/['+num+']'
      const response = await axios.get(url);
      navigation.navigate('Admin');
    }

    return (
        <View style={{ flex: 1,padding:10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(242, 242, 247)'}}>
            <View style={[styles.container]}>
            <Text style={{margin: 10, fontSize:20}}>Table No. {num}</Text>
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
                {temp2&&temp2.length>0?temp2[0].menus.map(order=>(
                     
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
                )):null}
                    
                </ScrollView>
                <View style={[{marginBottom:10, marginTop:'auto', padding:10, paddingTop:'auto'}]}>
                <View flexDirection='row' style={styles.listContainer}>
                        <Text style={{width:'50%', fontSize:28}}>
                            총액
                        </Text>
                        <Text style={{width:'20%', fontSize:28}}>
                            {qty}개
                        </Text>
                        <Text style={{width:'30%', fontSize:28, color:primaryColor}}>
                            {sum}원
                        </Text>
                    </View>
                        <TouchableOpacity onPress={()=>handlePayment()} style={styles.button}><Text style={{color:'white', fontSize:32, textAlign:'center'}}>결제 완료</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
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
