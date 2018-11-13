import React, { Component } from 'react'
import RootStack from './router/index'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

export default class App extends Component {
  render () {
    return <RootStack />
  }
};
