import React from 'react';
import {StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';


export default function Table(){
    const [menu, setMenu] = useState([
        {menu : '돈까스', qty: '1', price : '8000'} //임시


    ]);
        return(
            <View style={styles.container}>
            

            data={reviews}
                renderItem={({item})  => (  
                    
                    <TouchableOpacity  onPress={()=>{navagation.navagate('Button',item)}}>
                    <Text style={styles.btntext}>테이블1</Text>
                    <Text style={styles.Text}>돈까스</Text>
                    </TouchableOpacity>
    )}
                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>테이블2</Text>
                    <Text style={styles.Text}>돈까스</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>테이블3</Text>
                    <Text style={styles.Text}>돈까스</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>테이블4</Text>
                    <Text style={styles.Text}>돈까스</Text>
                    </TouchableOpacity>
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
 }
}

);