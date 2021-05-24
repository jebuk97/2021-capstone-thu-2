import React from 'react';

import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from '../tabs';
import { Home, Receipt, VoiceHome, Admin, Modal, Table } from '../screens';
import { LoginScreen } from '../login/LoginScreen';

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
      screen: Modal,
        params: {
            icon: 'user',
            tabName: '직원 호출',
        }
    },
    Admin : {
      screen: Table,
        params: {
            icon: 'shield',
            tabName: '관리자 모드',
        }
    },
    Temp : {
      screen: Home,
        params: {
            icon: '',
            tabName: '임시 버튼',
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
