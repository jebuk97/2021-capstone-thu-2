import React, {useEffect, useState, useRef} from 'react';
import { render } from 'react-dom';
import { View, Button, Image, TouchableOpacity, LinearLayout, Text, StyleSheet, ScrollView, Dimensions, FlexBox, Modal, Pressable} from 'react-native';
import { withOrientation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from 'react-native-voice';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import '../../global'
import { set } from 'react-native-reanimated';

var categorys=[];
var sumPrice = 0;
const primaryColor = 'rgb(0, 122, 255)';
var interval;

export function Home(props) {

  const dialogflowConfig = {
  "type": "service_account",
  "project_id": "newagent-mhmk",
  "private_key_id": "ff826ba186dd4dea61581175deb3e01109f43143",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0CKHuE5YgOyAy\n92XM9DagvkvkcLvbIEXh9SKs39ysDpJzLlXAQbZemOUJzFc+laZe/l35lh1a1HMg\n6hpcuJaB0RoSAy3bU8eHj9Un/+BLVH8yXfGk66IX8t6NJl0/zFv2gTbJFTzZiBEa\nk1YxJGI4eCj5iCtBU3y1SeGLzjLebUz5jBTfNx8Xi3/QyTfqr2FTiLa4NP4YAvna\njitdHYplMrdH/rskK2Q/QhXllGXUjHsNZWEANb/FWkhPTKqxjVHqdWDiG2wukm6x\nprOXGfpCuZoiee07syPM+Czqo4u2wxwsLTROfuiYMfChP6Aj1BTyEEpRsncaoI/m\n/WgmdsWrAgMBAAECggEAC1vsE6BqvXfdjTms06So+bVoBm7Se33qytnzqSKqwrRc\nqyXGRU4gGpHdCaQ58PnyOFYmScQd8Agth2sd5LHE1UYDNhW7Q/ZiRXxev5pWZYpc\nSCpDP9uaK5aoUhGUmpzjRIdclI1hfHwoUBvxuUIJbHSwaSYdTI7e9HVH5NFKxlvV\nu58Z5SaTzpY2aVj2mu8033f2AwIX793EFkzeu2QogeS7n8FFa9DX4u7o9Zs2m3PI\nA5pOhESWE7VB2ssmeZ/9gBu0RsaR9xnOmNHx97k7Y/Nw5Y9oIVCILnWF/f88v+Tx\nfj+b+HDwu26w532g6b66kUtVwk6X5uCAE0TmpHwPUQKBgQD31ISYr1N3DIrCA+1Y\nfxYzTj6LSZXopA58KZqGfwGm8I1v9X9rxlhjgH8UqN9FTXj1ci1RbSM8TdU46jlr\nbuaPTAPplK/4xqb5sMl9ow67UgGDxB97pwjJ7n/knp+ODTeDSUI7wxZ41BoePc5W\nQhjFZs2Brbcb901PXIBLWA734wKBgQC59/f5udvL4Qa/MIL43zJrlG/nxA0qAn3P\nt/NFQvfNCnRGfLoNXVAEyH6J13kfXz5lov/2Zzu5fx0zjCPyQfELix1OSbbvjpDm\nkgK93g2nP4qnjHU1TBC4aC1XvgpiIomXkwwEfXvNyPUxaOtpvhfo1T/+ljdFv+8V\ndyySiUUVmQKBgECR0zZAv9tNnj1sboNXIT6ezTbXJkKls8xvvn36S0DmfcNE0D0R\nQWgzS2jjksBorfItHFeRutN0Z/BbPjiafWGqaX6LKcoEX+7AO88LE8SEWjate5Jo\n86ZBCHtVRLbrBKKlDKerbYhvoppsef0JXZDY9wQpcYLMzQy3SgnXWJcHAoGAF74H\nw7Mt046sHNalsf5U4pU14EIQaC+fPli+zzXoix3tkF42JqSmJaYvOYvv48h2H+W6\nhgvR/TG0WbNnl3NBwfaFzEvu9hCegUFc5j6mQZcELbXp9N78N37dYxlZHARKyrY0\nT5JxrukcHK3HeF2Tkd8/51HoRphlfrkTULYDwukCgYEAhAATu8U1LpLR3LxSgGQa\no4va7jJ7bjNGFbaNq66/N9Jqu1+irwBKOS7Kyt5LRk3x4X+LWexchoOoL+6uPZ2L\nARyZbrrJdLujDF2pcAYpEMDgIoEfYq3em8A0PXHBoefNF67fVScgShl3/3GGMtMj\nrXY+uQvf52oLpGLhKFbAP38=\n-----END PRIVATE KEY-----\n",
  "client_email": "testmonkeybot@newagent-mhmk.iam.gserviceaccount.com",
  "client_id": "114847266998083579369",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/testmonkeybot%40newagent-mhmk.iam.gserviceaccount.com"
}

  const [recording, setRecording] = React.useState();
  const [printText, setPrintText] = React.useState('마이크 버튼을 누르고 말하세요.');
  const [cartState, setCartState] = React.useState([]);
  const [voiceState, setVoiceState] = React.useState(false);
  const [menuState, setMenuState] = React.useState([]);
  const [categorysState, setCategorysState] = React.useState([]);
  const [categoryState, setCategoryState] = React.useState(0);
  const [processState, setProcessState] = React.useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [tableNo, setTableNo] = React.useState(global.tableNo);
  const [modalVisible, setModalVisible] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState('');
  const [df, setDf] = useState('');

  const submitHandler = newResult => {
    const newArray = [...results, newResult];
    setMenuState(newArray);
    console.log(newArray);
  }

  var text1 = 'NO INPUT';
  
  var dfResult = 'NO INPUT';
  var cart = [];

  var record = null;
  var menus=[];
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

  useEffect(() => {

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
    // onPressCat = onPressCat.bind(this);
    //서버 수신부
    menus = [
      [
        {
          id: 1,
          img: 'https://recipe1.ezmember.co.kr/cache/recipe/2020/08/15/d52877fb8b255c1b8966857df2e5cee71.jpg',
          menu: '칼국수',
          price:7000
        },
        {
          id: 2,
          img: 'http://foodyap.co.kr/shopimages/goldplate1/058000000005.jpg?1572330055',
          menu: '만두',
          price: 5000
        },
        {
          id: 3,
          img: 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2719523959479C9B13',
          menu: '비빔국수',
          price:8000
        }
      ],
      [
        {
          id: 1,
          img: 'data:image/jpeg;base64,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',
          menu: '사이다',
          price:1000
        },
        {
          id: 3,
          img: 'data:image/jpeg;base64,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',
          menu: '콜라',
          price:1000
        }
      ]
    ]

    var categorys = [
      '식사류', '음료'
    ]
    setMenuState(menus);
    setCategorysState(categorys);
    console.log(getNavigationParams());

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [cartState]);
  
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
      price: price
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

  function handleSubmit(){
    if(cartState.length!=0){
      console.log(cartState);
      setCartState([]);
      //서버 전송 구현
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
    console.log('param : ', text, text.length);
    if(text.length==undefined){
      setPrintText('버튼을 누른 후 다시 한 번 말씀해주세요.');
      return;
    }
    if(dfResult =='NOINPUT'){
      setPrintText('버튼을 누른 후 다시 한 번 말씀해주세요.');
      return;
    } else{
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
              <Text>{printText}</Text>
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

            <View>
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
    height: chartHeight-30,
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
    width: '47%',
    height:280
  },
  menuContainer:{
    flexDirection:'row',
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width:'61%',
    marginLeft:15,
    overflow: 'scroll',
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