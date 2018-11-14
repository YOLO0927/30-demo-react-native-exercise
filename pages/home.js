'use strict'
import React, { Component } from 'react'
import {
  DeviceEventEmitter,
  Image,
  Navigator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'
import Util from '../public/utils'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper'
import Day1 from './day1'
import Day2 from './day2'
import Day3 from './day3'
import Day4 from './day4'
import Day5 from './day5'
import Day6 from './day6'

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      days: [
        {
          key: 0,
          title: 'A stopwatch',
          component: Day1,
          isFA: false,
          icon: 'ios-stopwatch',
          size: 48,
          color: '#ff856c',
          hideNav: false
        },
        {
          key: 1,
          title: 'A weather app',
          component: Day2,
          isFA: false,
          icon: 'ios-partly-sunny',
          size: 48,
          color: '#ff856c',
          hideNav: false
        },
        {
          key: 2,
          title: 'twitter',
          component: Day3,
          isFA: false,
          icon: 'logo-twitter',
          size: 48,
          color: '#ff856c',
          hideNav: false
        },
        {
          key: 3,
          title: 'cocoapods',
          component: Day4,
          isFA: true,
          icon: 'contao',
          size: 50,
          color: '#FF9A05',
          hideNav: false
        },
        {
          key: 4,
          title: 'find my location',
          component: Day5,
          isFA: false,
          icon: 'md-pin',
          size: 50,
          color: '#00D204',
          hideNav: false
        },
        {
          key: 5,
          title: 'Spotify',
          component: Day6,
          isFA: true,
          icon: 'spotify',
          size: 50,
          color: '#777',
          hideNav: true
        }
      ]
    }
  }

  _jumpToDay (index) {
    this.props.navigation.push(`Day${index + 1}`, {
      title: this.state.days[index].title,
      index: index + 1,
      display: !this.state.days[index].hideNav,
      component: this.state.days[index].component
    })
  }

  render () {
    var onThis = this;
    var boxs = this.state.days.map((elem, index) => {
      return (
        <TouchableHighlight
          key={ elem.key }
          style={[ styles.touchBox, index % 3 === 2 ? styles.touchBox2 : styles.touchBox1 ]}
          underlayColor="#eeeeee"
          onPress={() => onThis._jumpToDay(index)}
          >
          <View style={ styles.boxContainer }>
            <Text style={ styles.boxText }>Day{index + 1}</Text>
            { elem.isFA ? <IconFA size={ elem.size } name={ elem.icon } style={[ styles.boxIcon, { color: elem.color } ]}></IconFA> :
              <Icon size={ elem.size } name={ elem.icon } style={[ styles.boxIcon, { color: elem.color } ]}></Icon> }
          </View>
        </TouchableHighlight>
      )
    })
    return (
      <ScrollView style={ styles.mainView } title={ this.props.title }>
        <Swiper
          height={ 150 }
          showsButtons={ false }
          autoplay={ true }
          autoplayTimeout={ 3 }
          activeDot={<View style={ styles.dot }></View>}>
          <TouchableHighlight onPress={ () => onThis._jumpToDay(0) }>
            <View style={ styles.slide }>
              <Image style={ styles.image } source={require('../public/img/day1.png')}></Image>
              <Text style={ styles.slideText }>Day1: Timer</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={ () => onThis._jumpToDay(1) }>
            <View style={ styles.slide }>
              <Image style={ styles.image } source={require('../public/img/day2.png')}></Image>
              <Text style={ styles.slideText }>Day2: Weather</Text>
            </View>
          </TouchableHighlight>
        </Swiper>
        <View style={ styles.touchBoxContainer }>
          { boxs }
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  touchBox: {
    width: Util.size.width/3-0.33334,
    height: Util.size.width/3,
    backgroundColor: "#fff"
  },
  boxContainer: {
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxText: {
    position: "absolute",
    bottom: 15,
    width: Util.size.width / 3,
    textAlign: "center",
    left: 0,
    backgroundColor: "transparent"
  },
  boxIcon: {
    position: "relative",
    top: -10
  },
  mainView: {
    marginTop: 0
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  image: {
    width: Util.size.width,
    height: 80,
    flex: 1,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  slide: {
    flexGrow: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideText: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: Util.size.width,
    textAlign: 'center',
    fontSize: 12
  },
  touchBoxContainer: {
    flexDirection: "row",
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc"
  }
})
