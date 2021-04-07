import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { StackNavigator } from 'react-navigation';
const primaryColor = 'rgb(0, 122, 255)';

class App extends Component {
  componentDidMount(){
      this.interval = setInterval(() => this.handleTimeout(), 1000);
  }
  state = {
    modalVisible: true,
    time: 5
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  handleConfirm(navigation){
    //서버에 직원호출 전달
    console.log('Modal confirmed');
    navigation.navigate('Home');
  }
  handleTimeout(){
    if(this.state.time==0){
      clearInterval(this.interval);
      this.handleConfirm(this.props.navigation);
    }
    else
      this.setState({ time: parseInt(this.state.time)-1 });
  }

  render() {
    const { modalVisible } = this.state;
    return (
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
              <Text style={styles.modalText}>직원이 호출되었습니다.</Text>
              <Pressable flexDirection='row'
                style={[styles.button, styles.buttonClose]}
                onPress={()=>this.handleConfirm(this.props.navigation)}
              >
                <Text style={styles.textStyle}>확인</Text><Text style={[styles.textStyle, styles.timerStyle]}>{this.state.time}</Text>
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
    );
  }
}

const styles = StyleSheet.create({
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
});

export default App;