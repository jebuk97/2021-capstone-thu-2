import React, {useState, useEffect} from 'react';
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
// const [menu3, setMenu3] = useState();;

export default function Table(){
    const navigation = useNavigation();
    const [tableState, setTableState] = useState();
    useEffect(() => {
        // onPressCat = onPressCat.bind(this);
        //서버 수신부
        setTableState([
            {
                num : 1,
                menus : [
                    {menu : '돈까스', qty: '1', price : '8000'},
                    {menu : '치즈돈까스', qty: '1', price : '8000'},
                ]  //임시
            },
            {
                num : 2,
                menus : [
                    {menu : '치즈돈까스', qty: '1', price : '8000'}, 
                ] //임시
            }
        ]
        )
    
        return () => {
        };
      }, []);
      const tables = tableState;
        return(
            <ScrollView style={styles.container}>
            {tables&&tables.length>0?tables.map(table=>(
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('TableDetails',{num:table.num})}>
                    <Text style={styles.btntext}>{table.num}</Text>
                    <View style={{flexDirection: 'row'}}>
                        {table.menus.map(menu=>(
                            <Text style={styles.Text, {paddingRight:10}}>{menu.menu}:{menu.qty}</Text>
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
     alignSelf: 'stretch',
     alignItems: 'flex-start',
     padding :20,
     backgroundColor:'#FF5252',
     marginTop:30,
 },
 btntext:{
     color:'#fff',
     fontWeight:'bold',
 },
 menutext:{
    color:'#000',
    fontWeight:'bold',
    fontSize: 20,
}
}

);