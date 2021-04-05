import React from 'react';

import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from '../tabs';
import { Home, Receipt, VoiceHome } from '../screens';


const sidebarNavigator = createSidebarNavigator(
  {
    Home: {
      screen: Home,
      params: {
        icon: 'home',
        tabName: '주문하기',
      },
    },
    Receipt : {
      screen: Receipt,
        params: {
            icon: 'inbox',
            tabName: '계산서',
        }
    },
    VoiceHome : {
      screen: VoiceHome,
        params: {
            icon: 'microphone',
            tabName: '음성 주문',
        }
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(sidebarNavigator);
