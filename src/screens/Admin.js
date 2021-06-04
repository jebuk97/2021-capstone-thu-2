import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Image, render } from "react-native";
import{
    ScrollView,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Button,
    TouchableOpacity
} from 'react-native';
// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import TableDetails from '../screens/TableDetails'

// const [menu1, setMenu1] = useState();
// const [menu2, setMenu2] = useState();
// const [menu3, setMenu3] = useState();

var temp2 = [];
export default function Table(){
    const navigation = useNavigation();
    const [tableState, setTableState] = useState();
    useEffect(async () => {
        // onPressCat = onPressCat.bind(this);
        //서버 수신부
        temp2 = [];
        await loadTables();
    
        return () => {
        };
      }, [temp2]);

      async function loadTables() {
        const url = 'http://13.72.64.183:3000/order/giveorder/recovery'
        const response = await axios.get(url);
        console.log(response);
        var temp = [];
        temp2 = [];
        for(var i=0;i<response.data.result.length;i++){
          console.log(response.data.result[i]);
          temp.push(response.data.result[i]);
        }
        console.log('table loaded (temp) : ', temp)
        for(var i = 0; i < temp.length;i++){
             
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
        setTableState(temp2);
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

      const tables = tableState;
        return(
            <ScrollView style={styles.container}>
            {temp2&&temp2.length>0?temp2.map(table=>(
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('TableDetails',{num:table.tableNo})}>
                    <Text style={styles.btntext}>{table.tableNo}ㆍ</Text>
                    <View style={{flexDirection: 'row'}}>
                        {table.menus.map(menu=>(
                            <Text style={styles.Text, {color:'white', paddingRight:10, fontSize: 24}}>{menu.menu}:{menu.qty}</Text>
                        ))}
                    </View>
                    </TouchableOpacity>
            )):null}
            </ScrollView>
       );
    
}

// const Table1 = ({ navigation, route }) => {
//     return(
//     <View>
//         <Text style={styles.menutext}>메뉴추가</Text>
//         <TouchableOpacity style={styles.button} //onPress={()=>setMenu1()}>
//         >
//                     <Text style={styles.btntext}>국수</Text> 
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//                     <Text style={styles.btntext}>쌀국수</Text> 
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//                     <Text style={styles.btntext}>비빔국수</Text> 
//         </TouchableOpacity>
//     </View>); //<Text>{route.params.name}</Text>;
//   };
//   const Table2 = ({ navigation, route }) => {
//     return <Text>{route.params.name}</Text>;
//   };
//   const Table3 = ({ navigation, route }) => {
//     return <Text>{route.params.name}</Text>;
//   };
//   const Table4 = ({ navigation, route }) => {
//     return <Text>{route.params.name}</Text>;
//   };



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F0F0F0',
        paddingLeft: 60,
        paddingRight:60,
        
    },
 button:{
     flexDirection: 'row',
     alignSelf: 'stretch',
     alignItems: 'flex-start',
     padding :20,
     backgroundColor:'#FF5252',
     marginTop:30,
     borderRadius:10,
 },
 btntext:{
     color:'#fff',
     fontWeight:'bold',
     fontSize: 24
 },
 menutext:{
    color:'#000',
    fontWeight:'bold',
    fontSize: 24,
}
}

);