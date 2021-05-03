import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from 'react-native';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton'

function LoginScreen(props) {

    // 처음에 로그인 스크린의 텍스트 입력란은 비워져 있지만, 
    // 사용자가 텍스트를 입력하면 '상태(state)'가 바뀝니다. -> useState hook을 활용합니다.
    // useState hook은 초깃값을 담고 있는 변수와 값을 바꾸는(갱신하는) 펑션으로 이루어진 배열임을 기억합니다.
    const [username, setUsername] = useState();
   
    const [password, setPassword] = useState();
    
    return (
        <View>
            <Image style={styles.logo} 
                //source={require("../assets/icon.png")} 
            />
            <MyTextInput 
                icon="account"//아이콘을 정했습니다.
                autoCapitalize="none"// 입력되는 문자를 자동으로 대문자로 만들지 못하게 합니다.
                autoCorrect={false}// 오타 자동수정 기능을 끕니다.
                autoCompleteType="off"// 자동 완성 힌트 기능을 끕니다.
                autoFocus={true} //로그인 화면에서 사용자 이름란에 커서가 오게 만들어 줍니다.
                keyboardType="default"// 키보드 레이아웃은 일반형으로 합니다.
                onChangeText={text => setUsername(text)}//사용자가 입력하는 텍스트를 setUsername 펑션에 담아서 상태를 갱신합니다.(=username 변수에 새로운 값이 담깁니다.)
                placeholder="사용자 이름/username"
            />
         
            
            <MyTextInput 
                icon="account-key-outline"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                keyboardType="default"
                onChangeText={text => setPassword(text)}
                placeholder="암호/password"
                secureTextEntry={true}  // 암호 입력할 때 입력되는 문자를 숨깁니다.
            />
            <MyButton title="로그인" color="brightred"
                onPress={() => console.log(username, password)}//버튼을 누르면 입력된 값이 VS Code 터미널에 출력되는지 확인합니다.
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 100,
    }
})

export default LoginScreen;
