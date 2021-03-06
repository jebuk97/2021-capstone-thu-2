import React from 'react';
import '../../global'

import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  header: { position: 'absolute', top: 0 },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    margin: 5,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  voiceTab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: '100%',
    margin: 5,
    backgroundColor: 'rgb(255, 45, 85)',
    overflow: 'hidden',
    paddingHorizontal: 20,
    marginTop:'auto',
    marginBottom: 0,
  },
  tabContainer: {
    alignItems: 'center',
    height: '100%',
    width: 200,
    backgroundColor: 'white',
  },
});

const SidebarTabs = ({ navigation, descriptors }) => {
  const { routes, index } = navigation.state;
  return (
    <View style={[styles.tabContainer, {paddingTop:20, marginLeft:5, marginRight:5}]}>
      <View style={styles.tab, {height:'auto', marginTop:10}}>
          <Image source={require('../../assets/logo.png')} style={{width:100, height:100}}></Image>     
      </View>
      <View style={[styles.tab, {height: 100, flexDirection:'column'}]}>
          <Text style={{fontFamily: "Inter-Medium", fontSize:16}}>Table No. </Text>  
          <Text style={{fontSize:48, fontFamily: "Inter-Medium"}}>{global.tableNo}</Text>
      </View>
        {routes.map((route, tabIndex) => {
            const { routeName, params } = route;
            const { icon, tabName } = params || {};
            const color = tabIndex === index ? 'white' : 'black';
            const selected = tabIndex === index ? 
            {backgroundColor: 'rgb(0, 122, 255)',
            color: 'white'} : {};
            const tabStyle = tabName === "음성 주문" ? styles.voiceTab : styles.tab;
            return (
                tabName=='관리자 모드' && global.TableNo == 'admin'?undefined : <TouchableOpacity
                    onPress={() => {navigation.navigate(route.routeName, {
                      itemId:route.routeName,
                      otherParams: 'ohter',
                      navigation: navigation,
                    });}}
                    style={[tabStyle, selected]}
                    key={route.routeName}
                    >
                      {
                        tabName == '음성 주문'?
                        <Icon name={icon} size={24} color={color} style={{color: 'white', marginTop:75, marginBottom:5 }} />:
                        <Icon name={icon} size={24} color={color} style={{ marginRight: 10, width:30, textAlign:'center' }} />
                        }
                    
                    <View style={{ flex: 1, }}>
                        {
                        tabName == '음성 주문'?
                        <Text style={ {fontSize:24, color: 'white'}}>
                            {tabName}
                        </Text>:
                        <Text style={[{ color }, {fontSize:24}]}>
                        {tabName}
                    </Text>
                        }
                    </View>
                </TouchableOpacity>
                
            );
        })}

    </View>
  );
};

export default SidebarTabs;

