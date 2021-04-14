import React from 'react';
import {StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';


export default function Button({navigation}){
    return(

        <View style={styles.container }>
            <Text>{navigation.getParam('menu')}</Text>
            <Text>{navigation.getParam('price')}</Text>
        </View>




    )




}