import React, { useState } from 'react';
import { Image, StyleSheet, Modal, Text, Pressable } from 'react-native';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import MyTextInput from '../login/MyTextInput';
import MyButton from '../login/MyButton'

import Navigation from '../../src/navigation/NavigationStack';
const primaryColor = 'rgb(0, 122, 255)';

export default function LoginScreen() {
    const navigation = useNavigation();

    // 처음에 로그인 스크린의 텍스트 입력란은 비워져 있지만, 
    // 사용자가 텍스트를 입력하면 '상태(state)'가 바뀝니다. -> useState hook을 활용합니다.
    // useState hook은 초깃값을 담고 있는 변수와 값을 바꾸는(갱신하는) 펑션으로 이루어진 배열임을 기억합니다.
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState();

    function buttonHandler(num){
      //중복검사
      if(num == '1'){
        setModalText('중복된 테이블 번호입니다.');
        setModalVisible(true);
      } 
      else if(num==undefined){
        setModalText('테이블 번호를 입력하세요.');
        setModalVisible(true);
      }
      else if(num == 'admin'){
        console.log(num);
        navigation.navigate('Admin');
      }
      else{
        navigation.navigate('Home', {num: num});
      }

    }

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
                placeholder="테이블 번호 입력"
            />
            <MyButton title="완료" color="brightred"
                onPress={() => buttonHandler(username)}//버튼을 누르면 입력된 값이 VS Code 터미널에 출력되는지 확인합니다.
            />
             <MyButton title="관리자 로그인" color="brightred"
                onPress={() => buttonHandler('admin')}//버튼을 누르면 입력된 값이 VS Code 터미널에 출력되는지 확인합니다.
            />
            <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalText}</Text>
              <Pressable flexDirection='row'
                style={[styles.button, styles.buttonClose]}
                onPress={()=>setModalVisible(false)}
              >
                <Text style={styles.textStyle}>확인</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen, {display:'none'}]}
          onPress={() => this.setModalVisible(true)}
        >
        </Pressable>
      </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginTop: 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        justifyContent:'center',
        alignItems:'center'
      },
      buttonOpen: {
        backgroundColor: primaryColor,
      },
      buttonClose: {
        backgroundColor: primaryColor,
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 32,
      },
      timerStyle: {
        borderWidth:2,
        borderColor: 'white',
        borderRadius:13,
        width:26,
        height:26,
        fontSize:18,
        marginLeft:5
      }
})

