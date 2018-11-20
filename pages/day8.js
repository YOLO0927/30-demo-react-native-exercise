'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, TouchableHighlight, PanResponder, LayoutAnimation, ScrollView, UIManager } from 'react-native'
import { Map } from './day5'
import Util from '../public/utils'
import Icon from 'react-native-vector-icons/FontAwesome'
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [
        {
          icon: 'map-marker',
          text: '你的地点',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'pencil-square',
          text: '你的贡献',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'product-hunt',
          text: '离线区域',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'road',
          text: '实时路况',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'bus',
          text: '公交线路',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'bicycle',
          text: '骑车线路',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'photo',
          text: '卫星图像',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        },
        {
          icon: 'tree',
          text: '地形',
          underlayColor: '#888',
          iconSize: 15,
          onPress: () => { true }
        }
      ]
    }
  }
  render () {
    const options = this.state.options.map((option, index) => {
      return (
        <TouchableHighlight key={ index } underlayColor={ option.underlayColor } onPress={() => { option.onPress() }}>
          <View style={ styles.btn }>
            <Icon style={ styles.btnIcon } name={ option.icon } size={ option.iconSize }></Icon>
            <Text style={ styles.btnText }>{ option.text }</Text>
          </View>
        </TouchableHighlight>
      )
    })
    return (
      <View style={ styles.sideMenuContainer }>
        <Image source={require('../public/img/day2.png')} style={ styles.img }></Image>
        <View style={ styles.btnContainer }>
          { options }
        </View>
      </View>
    )
  }
}

class Day8 extends Component {
  constructor () {
      super()
      this.state = {
        showDrop: false
      }
  }

  _previousLeft = -0.7 *  Util.size.width - 10
  _previousOpacity = 0.7 * Util.size.width - 10
  _minLeft = -0.7 * Util.size.width - 10
  _menuStyles = {}
  _dropStyles = {}

  // LayoutAnimation.Presets.linear => create(500, 'linear', 'opacity') => 用来创建 configureNext 所需的 config 参数的辅助函数
  _CustomLayoutLinear = LayoutAnimation.Presets.linear
  menu = (null : ? { setNativeProps(props: Object): void })
  drop = (null : ? { setNativeProps(props: Object): void })

  _updatePosition () {
    this.menu && this.menu.setNativeProps(this._menuStyles)
    this.drop && this.drop.setNativeProps(this._dropStyles)
  }

  _endMove (evt, gestureState) {
    if (gestureState.vx < 0 || gestureState.dx < 0) {
      this._menuStyles.style.left = this._minLeft
      this._dropStyles.style.opacity = 0
      this._previousLeft = this._minLeft
      this._previousOpacity = 0
      this.setState({
        showDrop: false
      })
    }

    if (gestureState.vx > 0 || gestureState.dx > 0) {
      this._menuStyles.style.left = 0
      this._dropStyles.style.opacity = 1
      this._previousLeft = 0
      this._previousOpacity = 1
    }

    this._updatePosition()
    LayoutAnimation.configureNext(this._CustomLayoutLinear)
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy / gestureState.dx != 0
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({
          showDrop: true
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState.dx)
        this._menuStyles.style.left = this._previousLeft + gestureState.dx
        this._dropStyles.style.opacity = this._previousOpacity + Math.pow(gestureState.dx / (-this._minLeft), 0.5)
        if (this._menuStyles.style.left > 0) {
          this._menuStyles.style.left = 0
          this._dropStyles.style.opacity = 1
        }

        if (this._menuStyles.style.left < this._minLeft) {
          this._menuStyles.style.left = this._minLeft
          this._dropStyles.style.opacity = 0
        }

        this._updatePosition()
        LayoutAnimation.configureNext(this._CustomLayoutLinear)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => this._endMove(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) => this._endMove(evt, gestureState),
      onShouldBlockNativeResponder: (event, gestureState) => true
    })
    // 初始化抽屉组件的位置
    this._menuStyles = {
      style: {
        left: this._previousLeft
      }
    }
    this._dropStyles = {
      style: {
        opacity: this._previousOpacity
      }
    }
  }

  componentDidMount () {
    // 初始化后更新原生动画样式
    this._updatePosition()
    StatusBar.setBarStyle('default')
  }

  render () {
    return (
      <View style={ styles.container }>
        <Map mapType="standard" mapStyle={ styles.map } showsUserLocation={ false } followsUserLocation={ false }></Map>
        { this.state.showDrop ? (<View style={ styles.drop } ref={ (drop) => { this.drop = drop } }></View>) : (<View></View>) }
        <View { ...this._panResponder.panHandlers } style={ styles.sideMenu } ref={ (menu) => { this.menu = menu } }>
          <Menu />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Util.size.width,
    height: Util.size.height - Util.navHeight,
  },
  sideMenu: {
    height: Util.size.height - Util.navHeight,
    width: 0.7 * Util.size.width + 20,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    left: -0.7 * Util.size.width - 10
  },
  drop: {
    height: Util.size.height - Util.navHeight,
    width: Util.size.width,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  img: {
    width: 0.7 * Util.size.width,
    resizeMode: 'contain',
    height: 0.7 * Util.size.width / 1.754
  },
  sideMenuContainer: {
    height: Util.size.height - Util.navHeight,
    width: 0.7 * Util.size.width + 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 2
    }
  },
  map: {
    width: Util.size.width,
    height: Util.size.height
  },
  btnContainer: {
    paddingTop: 10,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#bbb'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fff'
  },
  btnIcon: {
    flex: 1,
    textAlign: 'center',
    color: '#555'
  },
  btnText: {
    flex: 3,
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 20,
    color: '#454545'
  }
})

export default Day8
