import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../login/colors';

function MyTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {/* icon 이 정해 지는 경우에만 조건부 렌더링, && 연산자  */}
            {icon && <Icon name={icon} style={styles.iconStyle} />}
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
        color: 'black',
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
