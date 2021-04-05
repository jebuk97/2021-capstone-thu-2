import React from 'react';

import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

const SidebarTabs = ({ navigation, descriptors, tableNo }) => {
  const { routes, index } = navigation.state;
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tab, {height:'auto', marginTop:10}}>
          <Text style={{fontSize:48}}>Logo</Text>       
      </View>
      <View style={[styles.tab, {height: 100, flexDirection:'column'}]}>
          <Text style={{fontSize:16}}>Table No. </Text>  
          <Text style={{fontSize:48}}>{tableNo}</Text>
      </View>
        {routes.map((route, tabIndex) => {
            const { routeName, params } = route;
            const { icon, tabName } = params || {};
            const color = tabIndex === index ? 'black' : 'grey';
            const tabStyle = tabName === "음성 주문" ? styles.voiceTab : styles.tab;
            return (
              
                <TouchableOpacity
                    onPress={() => navigation.navigate(routeName)}
                    style={tabStyle}
                    key={route.routeName}
                    >
                      {
                        tabName == '음성 주문'?
                        <FontAwesome name={icon} size={24} color={color} style={{color: 'white', marginTop:75, marginBottom:5 }} />:
                        <FontAwesome name={icon} size={24} color={color} style={{ marginRight: 10 }} />
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

