import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/colors';

function MyTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {/* icon 이 정해 지는 경우에만 조건부 렌더링, && 연산자  */}
            {icon && <MaterialCommunityIcons name={icon} style={styles.iconStyle} />}
            <TextInput style={styles.inputText} {...otherProps}  />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bright,
        borderRadius: 10,
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginVertical: 5,
    },
    iconStyle: {
        color: colors.brightred,
        fontSize: 25,
    },
    inputText: {
        fontSize: 18,
        marginLeft: 10,
    },
})

export default MyTextInput;
