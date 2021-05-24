import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// 우리가 만든 colors.js 를 '수입'합니다.
import colors from '../login/colors';

function MyButton({title, onPress, color}) {
    return (
        // colors.primary, secodary 등을 속성이름으로 활용하기 위해서 대괄호 [] 사용
        // 스타일이 여러개(=배열)면, 오른쪽에 있는 스타일이 우선함
        // 버튼의 색깔은 MyButton 컴포넌트를 가져다 쓰는 곳에서 color 속성의 값을 정함. 
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color]}]} onPress={onPress} >
           
                <Text style={styles.text}>{title}</Text>
         
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        margin: 2,
        alignItems: 'center',
        padding: 15,
    },
    text: {
        color: colors.bright,
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default MyButton;
