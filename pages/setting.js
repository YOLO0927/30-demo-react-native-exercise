import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

class Setting extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export default Setting
