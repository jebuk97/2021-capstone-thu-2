import React, {useEffect, useState, useRef} from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions, Modal, Pressable, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from 'react-native-voice';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import '../../global'
import axios from 'axios';
const primaryColor = 'rgb(0, 122, 255)';

export function Home(props) {

  const dialogflowConfig = {
    "type": "service_account",
    "project_id": "newagent-mhmk",
    "private_key_id": "325a4a7e7b053737abab81d7cf72f987949feee0",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXBtotPNKNEqjq\n4Obzi+CmKDRgS8xGGRMvh7oMdBcJ71t9wd3/oOfAdwMYlxfNnJgRzi3XUt5gTKNE\nSPyJvEdvDq/yeq5k6XrcOZ0nxp7dLU2L+GPDEXK+VWEy8p/sHkSgB2rHl++xVZ+R\nCBzzfBH4BksD+kz10ckJVZ1j3XAvcV+pyfTF1opCEsHj0N0rS6ho8Tw+VWbIjjFj\nowzpHi6cYbWUr1EPreh0qVXqJhIfuvigcMJaUUqK6TdkYekji4vYWNYGNG0KEroy\neRZTkltMC5rD5LEx9msseq4vTlwJ7jqO0L+JNrjnjLvUleDkKG+GmN3Kesw8/zcU\nMeB2RBajAgMBAAECggEABI01cwmTOucy3ULovaGkTt/JlenoOnki2xaXF9fKO9Ra\nCIldBPg/eSKY0ePnDBS41RVXut8asL4HFE0qSFMQQBMQgpDFsr4TLG/PRoBX3K7/\ntitX6hcKdnJuBZAPCrvUZTzz/NMEBQjHx93sy5Ok78q65Pm6hLbeUojUWSi/HhIT\nQ1xlLGZZ0a9VMhl9bvSs616KltJjQFrUzJFZotKiDZaJ1YnzWJKzOclJ1tgazob3\nQiJDYF7Xd6NWByr+x1nun51m5KqjcPLtwBKHCxIQJ/ivpBQT1LJjvraRqiYuQWOd\nPFQSC0wHXF1zuvOil78BEW1Bza7PqudoZ9IvQddzgQKBgQDFwSmhVyrQemF7QswV\noFm5zGKbB80VlOYza9/r4MbsCZOB0I9FN6AlcVuLWdKBs0fWWxaQv0UILQf+CCZY\nG2TW3rm607EMnKlQloxBteicDBXcWUJIl2PaNFxS1L45iPgXA9PCd8F+URrZIfIR\n3MyxtIyIbzAlccKLYorFJepyYwKBgQDDgmGTlzSwJBX3BqqLQkMX/IN9EJgIrbsc\nhY4eEEx3b1hJlSoi5hbKoapqvxSKWop94npBBmpr4kgk8ioMyrWpvYWM1PFKYLa3\nnicqqS9JYqN0yNaGMXAKfzX5leBCkJ5AGXXyEGcneaBROuIiE9yo7od6S4dpQ+4a\ncF1JgQbewQKBgEpi2pICA+zf3ANNoQ8Rfi7RntXKHW7cz6rQDS7hInJvN7lBBmN3\nBRqQhWrporF/CqqrINXZ3NGyfqsjzaiexVO9/Ac20gZ4d4gE2UVuc80fDqoQOUqt\nB7Zws7nEpLlnuEqP+fvQqEwnnf3HMxNdBvJhg+teR7IOFKvxqVl3ZbUZAoGBAJlF\nM53zIlkcUSPx0+2MqvC5A5QeWDIlkNTRVxL2kBvp7HrzN69YVnHQv7sjxcSZKo15\n6YHkt7WQFiLwvkp8+GHztCkuH2PB4jyc/fOR4wJTE/XQJW3agA2aoQPjnYZRvd5e\nl3qHpXbrAOXtla5Fh+3f4dHcOHIr0RRlFp0zS+GBAoGBALA9oO9wj8S95bG/AGg1\n8Bg5/hWdgnjz1TnA6bgHwDcca1xGxg9tZDy01v9zzjOTGAf1bIvSqPAeWVUfIL1t\nLxjZnGGdh9zkR/Iw35EFdKdRGhKagSNaEETXv1yESagsA0v1uGHGjLJ/f1kSj2Yi\nysSf1+yUj5ZrbuXZyoXLI7Ix\n-----END PRIVATE KEY-----\n",
    "client_email": "testmoney@newagent-mhmk.iam.gserviceaccount.com",
    "client_id": "105827071338164367474",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/testmoney%40newagent-mhmk.iam.gserviceaccount.com"
  }

  const [printText, setPrintText] = React.useState('마이크 버튼을 누르고 말하세요.');
  const [cartState, setCartState] = React.useState([]);
  const [menuState, setMenuState] = React.useState([]);
  const [categorysState, setCategorysState] = React.useState([]);
  const [categoryState, setCategoryState] = React.useState(0);
  const [processState, setProcessState] = React.useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState('');
  const [df, setDf] = useState('');

  var text1 = 'NO INPUT';
  
  var dfResult = 'NO INPUT';
  var menus = [];
  var categorys=[];
  const scrollViewRef = useRef();
  
  const _onSpeechStart = () => {
    console.log('onSpeechStart');
    setText('');
  };
  const _onSpeechEnd = () => {
    console.log('onSpeechEnd');
  };
  const _onSpeechResults = (event) => {
    console.log('onSpeechResults : '+ event.value[0]);
    //setText(event.value[0]);
    text1 = event.value[0];
    setText(text1);
    stopVoice();
    process();
  };
  const _onSpeechError = (event) => {
    console.log('_onSpeechError');
    console.log(event.error);
    // Voice.destroy().then(Voice.removeAllListeners);
    stopVoice();
    process();
    setPrintText('버튼을 누른 후 다시 한 번 말씀해주세요.');

  };

  useEffect(async () => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    console.log('----->sibal', cartState);
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_KOREAN,
      dialogflowConfig.project_id,
    );


    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    if(modalVisible==true){
      console.log('recording');
      _onRecordVoice();
    }
   
    //서버 수신부
   
    categorys = [
      '식사류', '음료'
    ]
    await loadMenu();
    //categorys = loadCats();
    //loadMenu();
    setMenuState(menus);
    forceUpdate();
    setCategorysState(categorys);
    console.log(getNavigationParams());

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [cartState]);
  
  async function loadMenu() {
    const url = 'http://13.72.64.183:3000/menu/category/all'
    const response = await axios.get(url);
    console.log(response);
    var temp = []
    for(var i=0;i<response.data.result.length;i++){
      temp.push(response.data.result[i].menus);
    }
    console.log('menu loaded (temp) : ', temp)
    menus = temp;
    var temp = []
    for(var i=0;i<response.data.result.length;i++){
      temp.push(response.data.result[i].name);
    }
    categorys = temp
  }

  function stopVoice(){
    setIsRecord(false);
    setModalVisible(false);
    Voice.stop();
  }

  const _onRecordVoice = () => {
    if (isRecord) {
      stopVoice();
    } else {
      console.log('==============================');
      setModalVisible(true);
      setPrintText('듣고 있습니다.');
      Voice.start('ko-KR');
    }
    setIsRecord(!isRecord);
  };

  function getNavigationParams(){
    let id = false;
    if(props.navigation.state.params) {
      id = props.navigation.state.params.itemId;
    }
    return id;
  }
  
  function printMenus(menu){
    if(menu.id%2==0) {
    return;
    }
    else{
      return (
        <TouchableOpacity style={styles.menu} onPress={()=>{onPressMenu(menu.menu)}}>
         <Image 
          style={{width:'100%', height:180, borderRadius:5}}
          source={{uri:menu.img}}/>
          <View style={{width: '100%', alignItems:'center'}}>
            <View>
            <Text style={{fontSize:28, paddingTop:12, textAlign:'left'}}>{menu.menu}</Text>
          </View>
          <View>
            <Text style={{fontSize:24, color:primaryColor, textAlign:'right'}}>{menu.price}원</Text>
          </View>
          </View>
       
      </TouchableOpacity>
      );
    }
  }
  function printMenus2(menu){
    if(menu.id%2==0) {
    return (
      <TouchableOpacity style={styles.menu} onPress={()=>{onPressMenu(menu.menu)}}>
        <Image 
          style={{width:'100%', height:180, borderRadius:5}}
          source={{uri:menu.img}}/>
        <View style={{width: '100%', alignItems:'center'}}>
            <View>
            <Text style={{fontSize:28, paddingTop:12, textAlign:'left'}}>{menu.menu}</Text>
          </View>
          <View>
            <Text style={{fontSize:24, color:primaryColor, textAlign:'right'}}>{menu.price}원</Text>
          </View>
          </View>
      </TouchableOpacity>
          );
    }
    else{
      return;
    }
  }

  function onPressMenu(menu){
    var tempCart = cartState;
    var price = 0;
    for(var i=0;i<menuState.length;i++){
      for(var j=0;j<menuState[i].length;j++){
        if(menu==menuState[i][j].menu){
          price = menuState[i][j].price;
        }
      }
    }
    setCartState(isDup(tempCart, menu, price));
    
    console.log('menu added', menu, cartState);
    forceUpdate();
    
  }

  function isDup(cart, menu, price){
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        cart[i].qty += 1;
        return cart;
      }
    }
    cart.push({
      menu: menu,
      qty: 1,
      price: price,
      tableNo: global.tableNo
      });
    return cart;
  }

  function onPressCat(index){
    setCategoryState(index);
  }
  function buttonRenderer(){
    const categorys = categorysState;
    var temp = categorys && categorys.length > 0 ? categorys.map((category, index)=>(
      <View>
        {categoryState==index ? 
        (<TouchableOpacity onPress={()=>{onPressCat(index)}} style={{padding:17,paddingTop:8, paddingBottom:8, borderBottomWidth:3, borderBottomColor:primaryColor}}><Text style={{fontSize:28, color:primaryColor}}>{category}</Text></TouchableOpacity>):
        (<TouchableOpacity onPress={()=>{onPressCat(index)}} style={{padding:17,paddingTop:8, paddingBottom:8}}><Text style={{fontSize:28, color:'black'}}>{category}</Text></TouchableOpacity>)
        }
      </View>
    )):null;
    return temp;
  }
  
  function sumPriceHandler(){
    var cart = cartState;
    var sum = 0;
    for(var i=0;i<cart.length;i++){
      sum += cart[i].price * cart[i].qty;
    }
    return sum;
  }
  function sumQtyHandler(){
    var cart = cartState;
    var sum = 0;
    for(var i=0;i<cart.length;i++){
      sum += cart[i].qty;
    }
    return sum;
  }

  function onPressDel(menu){
    var cart = cartState;
    var cart2 = [];
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        continue;
      }
      cart2.push(cart[i]);
    }
    setCartState(null);
    console.log('menu deleted', cart2, cartState);
    setCartState(cart2);
    forceUpdate();
  }

  async function handleSubmit(){
    if(cartState.length!=0){
      const url = 'http://13.72.64.183:3000/order/getorder';
      const json = JSON.stringify({ result: cartState });
      await axios.post(url, json, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      }).then((Resopnse) => {

      }).catch((ex)=>{
        console.log(ex);

      })
      setCartState([]);  
      console.log('send to server...', json);
    }
    else
      console.log('pass');
  }
  function onPressPlus(menu){
    var cart = cartState;
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        cart[i].qty += 1;
        setCartState(cart);
        forceUpdate();
        break;
      }
    }
  }
  function onPressMinus(menu){
    var cart = cartState;
    for(var i=0;i<cart.length;i++){
      if(cart[i].menu == menu){
        if(cart[i].qty>1){
          cart[i].qty -= 1;
          setCartState(cart);
          forceUpdate();
          break;
        } else{
          onPressDel(menu);
          break;
        }
      }
    }
  }

  async function request(message){
    var temp;
    await Dialogflow_V2.requestQuery(message, 
      result=>handleGoogleResponse(result),
      error=>console.log(error));
  }

  function handleGoogleResponse(result){
    console.log(result);
    let text = result.queryResult.parameters;
    sendBotResponse(text);
  }

  function sendBotResponse(text){
    setDf(text);
    dfResult = text;
    console.log('param : ', text, typeof(text.FOOD)=='undefined');
    
    if(typeof(text.FOOD)=='undefined'){
      console.log('menu error');
      setPrintText('버튼을 누른 후 다시 한 번 말씀해주세요.');
      return 0;
    }

    if(text1 =='NOINPUT'){
      console.log('No input');
      setPrintText('버튼을 누른 후 다시 한 번 말씀해주세요.');
      return 0;
    }

    console.log('adding menu...');
    var tempCart1 = [];
    for(var i=0;i<dfResult.FOOD.length;i++){
      var tempObj = {};
      tempObj.menu=dfResult.FOOD[i];
      tempObj.qty=dfResult.UNIT[i];
      if(tempObj.qty==undefined){
        tempObj.qty=1;
      }
    tempCart1.push(tempObj);
    }
    for(var i=0;i<tempCart1.length;i++){
      for(var j=0;j<tempCart1[i].qty;j++){
        onPressMenu(tempCart1[i].menu);
      }
    }
    console.log('====================menu added', text1, cartState);
    
  } 

  function temp(){
    console.log('temp func');
  }

  async function process(){
    text1 = text1.replace(/ /gi, '');
    console.log('origin : ', cartState);
    setProcessState(true);
    setPrintText('처리 중 입니다.');
    setModalVisible(false);
    setDf(null);
    console.log('Requesting to DialogFlow... : ', text1);
    request(text1);
    
    forceUpdate();
    setPrintText('마이크 버튼을 누르고 말하세요.');
  }

  function handleConfirm(){
    _onRecordVoice();
  }

    const menus1 = menuState;
    return(
      <View style={{flex:1}}>
        <View>
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
              <Text style={{fontSize:24}}>{printText}</Text>
              <Text style={[styles.modalText, {fontSize:32}]}>{text}</Text>
              <Pressable flexDirection='row'
                style={[styles.button, styles.buttonClose, {backgroundColor: 'rgb(255,45,85)'}]}
                onPress={()=>handleConfirm()}
              >
               <Text style={{padding:0, color:'white', textAlign:'center',marginTop:'auto', marginBottom:'auto'}}><Icon name="ios-stop-sharp" style={{fontSize:24}}></Icon></Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen, {display:'none'}]}
          onPress={() => handleConfirm()}
        >
        </Pressable>
      </View>
        <View style={styles.header}>
          {buttonRenderer()}
        </View>
          <ScrollView stickyHeaderIndices={[1]} style={{flex: 1, backgroundColor: 'rgb(242, 242, 247)'}}>

            <View style={{ flexDirection:'row', width:'63%'}}>
            <View style={styles.menuContainer}>
                {menus1[categoryState]&&menus1[categoryState].length>0?menus1[categoryState].map(menu=>(
                  printMenus(menu)
                )):null}
              </View>
              <View style={styles.menuContainer}>
                {menus1[categoryState]&&menus1[categoryState].length>0?menus1[categoryState].map(menu=>(
                  printMenus2(menu)
                )):null}
              </View>
            </View>
          </ScrollView>
          <View style={styles.order}>
              <View style={{margin:20}}><Text style={{textAlign:'center', fontSize: 24}}>주문내역</Text></View>
              <ScrollView style={{minHeight:'60%'}}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              >
              {cartState.map(cart=>(
                <View style={{margin:10, paddingLeft:10, paddingRight:10}}>
                  <View flexDirection='row' style={{padding:10}}>
                    <Text style={{fontSize:30, width:'90%'}}>{cart.menu}</Text>
                    <TouchableOpacity onPress={()=>onPressDel(cart.menu)}><Text style={{fontSize:30, color:'red', lineHeight:30, marginLeft:'auto'}}>×</Text></TouchableOpacity>
                  </View>
                  <View flexDirection='row' style={{padding:10}}>
                    <TouchableOpacity onPress={()=>onPressMinus(cart.menu)}><Text style={{fontSize:20, width:30, textAlign:'center'}}>-</Text></TouchableOpacity>
                    <Text style={{fontSize:20, width:30, textAlign:'center'}}>{cart.qty}</Text> 
                    <TouchableOpacity onPress={()=>onPressPlus(cart.menu)}><Text style={{fontSize:20, width:30, textAlign:'center'}}>+</Text></TouchableOpacity>
                    <Text style={{fontSize:20, marginLeft:'auto', color:primaryColor}}>{cart.qty*cart.price} 원</Text>
                  </View>
                </View>
              ))}
              </ScrollView>
              <View style={styles.orderButtonContainer}>
                <View flexDirection='row'>
                  <Text style={{fontSize:30, textAlign:'left', margin:10, marginRight:'auto'}}>총 수량</Text>
                  <Text style={{fontSize:30, textAlign:'right', margin:10}}>{sumQtyHandler()} 개</Text>
                </View>
                <View flexDirection='row'>
                  <Text style={{fontSize:30, textAlign:'left', margin:10, marginRight:'auto', color:primaryColor}}>총 금액</Text>
                  <Text style={{fontSize:30, textAlign:'right', margin:10, color:primaryColor}}>{sumPriceHandler()} 원</Text>
                </View>
                
                <TouchableOpacity onPress={()=>handleSubmit()} style={styles.button}><Text style={{color:'white',fontSize:30, textAlign:'center',}}>주문하기</Text></TouchableOpacity>
              </View>
            </View>
            <View flexDirection='row' style={{width:'65%', alignItems:'center', backgroundColor:'rgb(242, 242, 247)'}}>
      <Text style={[ styles.shadow, {fontSize:32, marginLeft:10, color:'black', padding:5, paddingLeft:10, paddingRight:10, backgroundColor:'white', borderRadius:30, marginBottom: 15}]}>{printText}</Text>
      
    </View>
    <TouchableOpacity
        onPress={()=>_onRecordVoice()}
        style={[styles.button, {backgroundColor:'rgb(255,45,85)', marginLeft:'auto', position: 'absolute', left: -190, bottom:10, width:180, height:200, zIndex:10}]}
      >
        
        <Text style={{padding:0, color:'white', textAlign:'center',marginTop:'auto', marginBottom:'auto'}}><Icon name="ios-mic" style={{fontSize:48}}></Icon></Text>
      </TouchableOpacity>
    </View>
        
    );
              };
const chartHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  button:{
    borderWidth: 0,
    borderRadius:10,
    padding:10,
    margin:10,
    backgroundColor: primaryColor,
    shadowColor: "#30C1DD",
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {width:0, height: 4}
  },
  shadow:{
    shadowColor: "#30C1DD",
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {width:0, height: 4}
  },
  order:{
    backgroundColor: 'white',
    height: chartHeight-60,
    width: '35%',
    top: 0,
    marginTop:0, 
    right:1,
    left:'65%',
    flex: 1,
    borderRadius: 5,
    position: 'absolute'
  },
  menu:{
    backgroundColor: 'white',
    margin:10,
    marginTop:5,
    marginBottom:5,
    borderRadius: 5,
    width: '95%',
    height:280
  },
  menuContainer:{
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft:15,
    marginTop:5
  },
  orderButtonContainer:{
    marginTop:20,
    marginBottom:20,
    padding:10
  },
  header:{
    flexDirection:'row'
  },centeredView: {
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
});

export default Home;