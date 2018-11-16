import Icon from 'react-native-vector-icons/Ionicons'
import React from 'react'
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, StackActions } from 'react-navigation';
import Home from '../pages/home'
import Index from '../pages/index'
import Setting from '../pages/setting'
import ComingSoon from '../pages/comingsoon'
import Day1 from '../pages/day1'
import Day2 from '../pages/day2'
import Day3 from '../pages/day3'
import Day4 from '../pages/day4'
import Day5 from '../pages/day5'
import Day6 from '../pages/day6'
import Day7 from '../pages/day7'
import Day8 from '../pages/day8'
import Day9 from '../pages/day9'

const styles = StyleSheet.create({
  navTitle: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  }
})

const HomeStack = createStackNavigator({
  Home: Home,
  ComingSoon: ComingSoon,
  Day1: Day1,
  Day2: Day2,
  Day3: Day3,
  Day4: Day4,
  Day5: Day5,
  Day6: Day6,
  Day7: Day7,
  Day8: Day8,
  Day9: Day9
}, {
  // initialRouteName: 'Day3',
  navigationOptions: ({ navigation }) => ({
    headerTitle: (route) => {
      return (
        <View style={ styles.navTitle }>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{ navigation.state.params.title || '测试demo' }</Text>
        </View>
      )
    }
  })
})
const defaultGetStateForAction = HomeStack.router.getStateForAction;

HomeStack.router.getStateForAction = (action, state) => {
  if (action.type === 'Navigation/INIT' && state) {
    state.routes[0] = {
      ...state.routes[0],
      params: {
        index: 0,
        title: '30 Days of RN'
      }
    }
    return {
      ...state
    }
  }
  return defaultGetStateForAction(action, state)
}

const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Setting: Setting
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#3D3D4D',
      }
    },
    navigationOptions: ({ navigation }) => ({
      // 隐藏 tabbar 的方式不太合适，每次 tabbar 都会全部重新加载，导致判断过多，还是将 bottomTabNavigator 包裹在 stackNavigator 合适
      tabBarVisible: !navigation.state.index || navigation.state.index < 1,
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`
        } else if (routeName === 'Setting') {
          iconName = `ios-settings`
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
      tabBarLabel: (route) => {
        const { routeName } = navigation.state
        let label
        if (routeName === 'Home') {
          label = '主页'
        } else if (routeName === 'Setting') {
          label = '设置'
        }
        return <Text style={{ color: route.focused ? '#e91e63' : '#fff', textAlign: 'center', fontSize: 12 }}>{ label }</Text>
      }
    })
  }
);

export default RootStack
