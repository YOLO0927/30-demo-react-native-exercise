/**
 * Day 3
 * twitter entrance animation
 */
'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ScrollView, Platform, Animated, Easing, Image, RefreshControl, SscrollView, StatusBar, StyleSheet, TabBarIOS, TouchableHighlight, TouchableOpacity } from 'react-native'
import Util from '../public/utils'
import Icon from 'react-native-vector-icons/Ionicons'
import ScrollableTabView from 'react-native-scrollable-tab-view'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

// 开场动画
class Entrance extends Component {
  constructor () {
    super()
    this.state = {
      transformAnim: new Animated.Value(1),
      opacityAnim: new Animated.Value(1)
    }
  }

  componentDidMount () {
    Animated.timing(
      this.state.transformAnim,
      {
        toValue: 50,
        duration: 1200,
        delay: 1000,
        easing: Easing.elastic(2)
      }
    ).start()
    Animated.timing(
      this.state.opacityAnim,
      {
        toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay: 1200
      }
    ).start()
    setTimeout(() => {
      this.props.hideThis()
    }, 2300)
  }

  render () {
    return (
      <Animated.View style={[ styles.entrance, { opacity: this.state.opacityAnim } ]}>
        <AnimatedIcon size={60} style={[ styles.twitter, { transform: [{ scale: this.state.transformAnim }] } ]} name="logo-twitter"></AnimatedIcon>
      </Animated.View>
    )
  }
}

Entrance.propTypes = {
  hideThis: PropTypes.func.isRequired
}

class TwitterPost extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRefreshing: false,
      timeArr: [String(new Date())]
    }
  }

  _onRefresh () {
    this.setState({
      isRefreshing: true
    })
    setTimeout(() => {
      this.setState({
        timeArr: [
          ...this.state.timeArr,
          String(new Date())
        ]
      })
      this.setState({
        isRefreshing: false
      })
    }, 1000)
  }

  _onScroll (e) {

  }

  render () {
    const timeTexts = this.state.timeArr.map((time, index) => {
      return (<Text key={ index }>{ time }</Text>)
    })
    return (
      <ScrollView
        onScroll={ (e) => this._onScroll(e) }
        refreshControl={
          <RefreshControl
            refreshing={ this.state.isRefreshing }
            onRefresh={ () => this._onRefresh() }
            tintColor="#ddd"/>
        }>
        <Image source={require('../public/img/day3.png')} style={{ width: Util.size.width, height: Util.size.height - 120 }}></Image>
        { timeTexts }
      </ScrollView>
    )
  }
}

class TwitterFlow extends Component {
  render () {
    return (
      <View>
        <View style={ styles.nav }>
          <View style={ styles.navLeft }>
            <Icon name="ios-person-add" size={23} style={{ color: '#1b95e0', paddingLeft: 10 }}></Icon>
          </View>
          <View style={ styles.navMid }>
            <Icon name="logo-twitter" size={27} style={{ color: '#1b95e0' }}></Icon>
          </View>
          <View style={ styles.navRight }>
            <Icon name="ios-search" size={23} style={{ color: '#1b95e0', width: 30 }}></Icon>
            <Icon name="ios-create" size={23} style={{ color: '#1b95e0', width: 30, paddingRight: 10 }}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}

class FacebookTabBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabIcons: []
    }
  }

  componentDidMount () {
    setTimeout(() => this.props.goToPage(0), 0)
    // ScrollableTabView 组件中具有初始属性 scrollValue，所以在此我们可以监听这个属性的变化
    // 当需要频繁改动导致频繁触发 render 时可以利用此方法提升性能
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue)
  }

  setAnimationValue ({ value }) {
    this.state.tabIcons.forEach((icon, index) => {
      const progress = (value - index >= 0 && value - index <= 1) ? value - index : 1
      // 使用 setNativeProps 直接改变原生组件的属性
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress)
        }
      })
    })
  }

  iconColor (progress) {
    const red = 49 + (159 - 49) * progress
    const green = 149 + (159 - 49) * progress
    const blue = 215 + (159 - 215) * progress
    return `rgb(${red}, ${green}, ${blue})`
  }

  render () {
    return (
      <View style={[ styles.tabs, this.props.style ]}>
        {
          this.props.tabs.map((tab, index) => {
            return (
              <TouchableOpacity
                key={ tab }
                onPress={ () => setTimeout( () => this.props.goToPage(index), 0 ) }
                style={ styles.tab }>
                <Icon
                  name={ tab }
                  size={ 30 }
                  color={ this.props.activeTab === index ? 'rgb(49,149,215)' : 'rgb(159,159,159)' }
                  ref={ (icon) => { this.tabIcons[index] = icon } }/>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

FacebookTabBar.propTypes = {
  goToPage: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired
}

class TwitterTab extends Component {
  constructor () {
    super()
    this.state = {
      selectedTab: '主页',
      title: '主页'
    }
  }

  changeTab (tabName) {
    this.setState({
      selectedTab: tabName
    })
  }

  _updateTitle (obj) {
    const { i } = obj
    let title = ''
    switch (i) {
      case 0:
        title = '主页'
        break
      case 1:
        title = "通知";
        break;
      case 2:
        title = "私信";
        break;
      case 3:
        title = "我";
        break;
    }
    this.setState({
      title
    })
  }

  render () {
    const iosTabView = (
      <TabBarIOS barTintColor="#fff" tintColor="#1b95e0">
        <Icon.TabBarItem
          title="主页"
          iconName="ios-home"
          selectedIconName="ios-home"
          onPress={ () => this.changeTab('主页') }
          selected={ this.state.selectedTab === '主页' }>
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem
            title="通知"
            iconName="ios-notifications-outline"
            selectedIconName="ios-notifications"
            onPress={ () => this.changeTab('通知') }
            selected={ this.state.selectedTab === '通知'}>
            <TwitterFlow/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="私信"
            iconName="ios-mail"
            selectedIconName="ios-mail"
            onPress={ () => this.changeTab('私信') }
            selected={ this.state.selectedTab === '私信'}>
            <TwitterFlow/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="我"
            iconName="ios-person"
            selectedIconName="ios-person"
            onPress={ () => this.changeTab('我') }
            selected={ this.state.selectedTab === '我'}>
            <TwitterFlow/>
          </Icon.TabBarItem>
      </TabBarIOS>
    )

    const androidTabView = (
      <View>
        <View style={ styles.navBg }></View>
        <View style={ styles.navAndroid }>
          <View style={ styles.logoContainer }>
            <Icon name="logo-twitter" color="#fff" size={27} />
            <Text style={ styles.title }>{ this.state.title }</Text>
          </View>
          <View style={ styles.iconContainer }>
            <Icon name="ios-search" color="#fff" size={25} />
            <Icon name="ios-create" color="#fff" size={25} />
          </View>
        </View>
        <ScrollableTabView
          onChangeTab={ obj => this._updateTitle(obj) }
          renderTabBar={ () => <FacebookTabBar /> }>
          <TwitterPost tabLabel="ios-home" />
          <TwitterPost tabLabel="ios-notifications" />
          <TwitterPost tabLabel="ios-mail" />
          <TwitterPost tabLabel="ios-person" />
        </ScrollableTabView>
      </View>
    )
    return Platform.OS === 'ios' ? iosTabView : androidTabView
  }
}

class Day3 extends Component {
  constructor () {
    super()
    this.state = {
      show: true
    }
  }

  componentDidMount () {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('default')
    }
  }

  _hideEntrance () {
    this.setState({
      show: false
    })
  }

  render () {
    let entrance = this.state.show ? (<Entrance hideThis={ () => this._hideEntrance() }/>) : (<View></View>)
    return (
      <View style={ styles.twitterContainer }>
        <TwitterTab />
        { entrance }
      </View>
    )
  }
}

export default Day3

const styles = StyleSheet.create({
  entrance: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor: '#1b95e0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  twitter: {
    color: '#fff',
    position: 'relative',
    top: -20,
    textAlign: 'center'
  },
  nav: {
    flexDirection: 'row',
    paddingTop: 5,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    backgroundColor: '#fff'
  },
  navLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  navMid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: '#111'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 35
  },
  img: {
    width: 375,
    height: 550
  },
  title: {
    color: '#fff',
    fontSize: 20
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tabView: {
    flex: 1,
    height: 500,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.01)'
  },
  twitterContainer: {
    flex: 1
  },
  itemWrapper:{
    backgroundColor: '#fff'
  }
})
