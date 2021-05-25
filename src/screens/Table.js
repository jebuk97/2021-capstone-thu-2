import React, {useState} from 'react';
import { Image, render } from "react-native";
import{
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
import TableDetails from '../screens/TableDetails'
import { useNavigation } from '@react-navigation/native';
const Stack = createStackNavigator();

// const [menu1, setMenu1] = useState();
// const [menu2, setMenu2] = useState();
// const [menu3, setMenu3] = useState();

const App = () => {
    return (
         <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Table}
          />
          <Stack.Screen
            name="Details"
            component={TableDetails}
          />
        </Stack.Navigator>
    );
  };
  export default App;





function Table(){
    const [menu, setMenu] = useState([
        {menu : '돈까스', qty: '1', price : '8000'} //임시


    ]);
        return(
            <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('TableDetails',{name:'table1'})}>
                    <Text style={styles.btntext}>테이블1</Text>
                    <Text style={styles.Text}>국수</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'center',
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