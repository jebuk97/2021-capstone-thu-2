import React from 'react';

import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from '../tabs';
import { Home, Receipt, VoiceHome, Admin, Modal, Table/*, VoiceHome2 */} from '../screens';
import { LoginScreen } from '../login/LoginScreen';

const sidebarNavigator = createSidebarNavigator(
  {
    Home: {
      screen: VoiceHome,
      params: {
        icon: 'basket',
        tabName: '주문하기',
      },
    },
    Receipt : {
      screen: Receipt,
        params: {
            icon: 'receipt',
            tabName: '계산서',
        }
    },
    Call : {
      screen: Modal,
        params: {
            icon: 'ios-person',
            tabName: '직원 호출',
        }
    },
    // VoiceHome2 : {
    //   screen: VoiceHome2,
    //     params: {
    //         icon: 'microphone',
    //         tabName: '음성 주문2',
    //     }
    // },
    // VoiceHome : {
    //   screen: Home,
    //     params: {
    //         icon: 'mic',
    //         tabName: '음성 주문',
    //     }
    // },
    
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(sidebarNavigator);
