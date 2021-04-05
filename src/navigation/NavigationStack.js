import React from 'react';

import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from '../tabs';
import { Home, Receipt, VoiceHome } from '../screens';


const sidebarNavigator = createSidebarNavigator(
  {
    Home: {
      screen: Home,
      params: {
        icon: 'shopping-bag',
        tabName: '주문하기',
      },
    },
    Receipt : {
      screen: Receipt,
        params: {
            icon: 'credit-card',
            tabName: '계산서',
        }
    },
    Call : {
      screen: VoiceHome,
        params: {
            icon: 'user',
            tabName: '직원 호출',
        }
    },
    Admin : {
      screen: VoiceHome,
        params: {
            icon: 'shield',
            tabName: '관리자 모드',
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
