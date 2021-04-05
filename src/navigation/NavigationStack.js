import React from 'react';

import { createAppContainer } from 'react-navigation';

import { createSidebarNavigator } from '../tabs';
import { Home, Receipt } from '../screens';


const sidebarNavigator = createSidebarNavigator(
  {
    Home: {
      screen: Home,
      params: {
        icon: 'home',
        tabName: '주문하기',
      },
    },
    Red : {
      screen: Receipt,
        params: {
            icon: 'inbox',
            tabName: '계산서',
        }
    },
    Voice : {
      screen: Receipt,
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
