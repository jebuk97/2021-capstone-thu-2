import React from 'react';
import {StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';


export default function login(){
   
        return(
            <View style={styles.container}>
            <View style={styles.regform}>
              <Text style={styles.header}>로그인</Text>

              <TextInput style={styles.textinput} placeholder="Id"
                underlineColorAndroid={'transparent'}/>

              <TextInput style={styles.textinput} placeholder="password"
                secureTextEntry={true} underlineColorAndroid={'transparent'}/>

                
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>로그인</Text>
                    </TouchableOpacity>
            </View>

            </View>
       );
    
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        paddingLeft: 60,
        paddingRight:60,
        
    },
    regform:{
      alignSelf : 'stretch',
 },

 header:{
   
     fontSize:24,
     color: '#FF5252',
     paddingBottom:10,
     marginBottom:40,
     borderBottomColor:'#EF9A9A',
     borderBottomWidth:1,

 },
 textinput:{
     alignSelf:'stretch',
     height:40,
     marginBottom:30,
     color:'#fff',
     borderBottomColor:'#EF9A9A',
     borderBottomWidth:1,
 },
 button:{
     alignSelf: 'stretch',
     alignItems: 'center',
     padding :20,
     backgroundColor:'#FF5252',
     marginTop:30,
 },
 btntext:{
     color:'#fff',
     fontWeight:'bold',
 }
}

);