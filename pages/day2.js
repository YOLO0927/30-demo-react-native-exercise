import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Platform, Image, ScrollView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native'
import Util from '../public/utils'
import Icon from 'react-native-vector-icons/Ionicons'
import Swiper from 'react-native-swiper'

const weatherData = require('../public/weatherdata')

class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      weather: weatherData
    }
  }

  componentDidMount () {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('light-content')
    }
  }

  _back () {
    this.props.back()
  }

  render () {
    const slides = this.state.weather.map((elem, index) => {
      const hourView = elem.hours.map((hourElem, hourIndex) => {
        return (
          <View key={ hourElem.key } style={ styles.withinDayHoursBox }>
            <Text style={ hourIndex === 0 ? styles.withinDayHoursTimeBold : styles.withinDayHoursTime }>{ hourElem.time }</Text>
            <Icon name={ hourElem.icon } size={ 25 } style={[ styles.withinDayHoursIcon, { color: hourElem.color } ]}></Icon>
            <Text style={ hourIndex === 0 ? styles.withinDayHoursDegreeBold : styles.withinDayHoursDegree }>{ hourElem.degree }</Text>
          </View>
        )
      })

      const dayView = elem.days.map((dayElem, dayIndex) => {
        return (
          <View key={ dayElem.key } style={ styles.withinWeekLine }>
            <View style={ styles.withinWeekDay }>
              <Text style={ styles.withinWeekDayText }>{ dayElem.day }</Text>
            </View>
            <View style={ styles.withinWeekIcon }>
              <Icon name={ dayElem.icon } style={ styles.withinWeekIconIcon } size={ 25 }></Icon>
            </View>
            <View style={ styles.withinWeekDegree }>
              <Text style={ styles.withinWeekHigh }>{ dayElem.high }</Text>
              <Text style={ elem.night ? styles.withinWeekLowNight : styles.withinWeekLow }>{ dayElem.low }</Text>
            </View>
          </View>
        )
      })

      return (
        <View key={ elem.key }>
          <Image style={ styles.image } source={ elem.bg }></Image>
          <ScrollView style={ styles.pageContainer } showsVerticalScrollIndicator={ false }>
            <View style={ styles.headInfo }>
              <Text style={ styles.city }>{ elem.city }</Text>
              <Text style={ styles.abs }>{ elem.abs }</Text>
              <Text style={ styles.degree }>{ elem.degree }</Text>
              <Text style={ styles.circle }>°</Text>
            </View>
            <View style={ styles.withinDay }>
              <View style={ styles.withinDayGeneral }>
                <View style={ styles.withinDayHead }>
                  <Text style={ styles.withinDayWeek }>{ elem.today.week }</Text>
                  <Text style={ styles.withinDayDay }>{ elem.today.day }</Text>
                </View>
                <View style={ styles.withinDayTail }>
                  <Text style={ styles.withinDayHigh }>{ elem.today.high }</Text>
                  <Text style={ elem.night ? styles.withinDayLowNight : styles.withinDayLow }>{ elem.today.low }</Text>
                </View>
              </View>
              <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false } style={ styles.withinDayHoursContainer }>
                <View style={ styles.withinDayHours }>
                  { hourView }
                </View>
              </ScrollView>
              <View style={ styles.withinWeek }>
                { dayView }
              </View>
              <View style={ styles.weatherInfo }>
                <Text style={ styles.weatherInfoText }>{ elem.info }</Text>
              </View>
              <View style={ styles.weatherOther }>
                <View style={ styles.weatherOtherSection }>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>日出：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.rise }</Text>
                  </View>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>日出：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.down }</Text>
                  </View>
                </View>
                <View style={ styles.weatherOtherSection }>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>降雨概率：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.prop }</Text>
                  </View>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>湿度：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.humi }</Text>
                  </View>
                </View>
                <View style={ styles.weatherOtherSection }>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>风速：</Text>
                    <Text style={ styles.weatherOtherValue }>
                      <Text style={{ fontSize: 10 }}>{ elem.dir }</Text>{ elem.speed }
                    </Text>
                  </View>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>体感温度：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.feel }</Text>
                  </View>
                </View>
                <View style={ styles.weatherOtherSection }>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>降水量：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.rain }</Text>
                  </View>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>气压：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.pres }</Text>
                  </View>
                </View>
                <View style={ styles.weatherOtherSection }>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>能见度：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.sight }</Text>
                  </View>
                  <View style={ styles.weatherOtherLine }>
                    <Text style={ styles.weatherOtherTitle }>紫外线指数：</Text>
                    <Text style={ styles.weatherOtherValue }>{ elem.uv }</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    })

    return (
      <View style={{ flex: 1 }}>
        <Swiper
          showsButtons={ false }
          paginationStyle={ styles.swiperPagination }
          dot={ <View style={ styles.swiperDot } /> }
          activeDot={ <View style={ styles.swiperActiveDot } /> }>
          { slides }
        </Swiper>
        <TouchableHighlight onPress={ () => this._back() } style={ styles.backBtn }>
          <Icon size={ 17 } name="ios-list" style={ styles.backBtnIcon }></Icon>
        </TouchableHighlight>
      </View>
    )
  }
}

Weather.propTypes = {
  back: PropTypes.func.isRequired
}

class Day2 extends Component {
  _back () {
    this.props.navigation.pop()
    StatusBar.setBarStyle('default')
  }

  render () {
    return (
      <Weather back={ () => this._back() }></Weather>
    )
  }
}

export default Day2

const styles = StyleSheet.create({
  withinDayHoursBox: {
    width: 55
  },
  withinDayHoursTimeBold: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500'
  },
  withinDayHoursTime: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center'
  },
  withinDayHoursIcon: {
    textAlign: 'center',
    paddingTop: 5
  },
  withinDayHoursDegree: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 5,
    textAlign: 'center'
  },
  withinDayHoursDegreeBold: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: '500'
  },
  withinWeekLine: {
    flexDirection: 'row',
    height: 28
  },
  withinWeekDay: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1
  },
  withinWeekDayText: {
    color: '#fff',
    paddingLeft: 20,
    fontSize: 15
  },
  withinWeekIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  withinWeekIconIcon: {
    color: '#fff'
  },
  withinWeekDegree: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingRight: 25
  },
  withinWeekHigh: {
    color: '#fff',
    width: 35,
    fontSize: 16,
    textAlign: 'right'
  },
  withinWeekLow: {
    color: '#eee',
    width: 35,
    fontSize: 16,
    textAlign: 'right'
  },
  withinWeekLowNight: {
    color: '#aaa',
    width: 35,
    fontSize: 16,
    textAlign: 'right'
  },
  image: {

  },
  pageContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: Util.size.width,
    left: 0,
    height: Util.size.height - Util.tabbarHeight - Util.navHeight
  },
  headInfo: {
    paddingTop: 70,
    alignItems: 'center',
    paddingBottom: 60
  },
  city: {
    fontSize: 25,
    color: '#fff',
    paddingBottom: 5,
    backgroundColor: 'transparent'
  },
  abs: {
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'transparent'
  },
  degree: {
    fontSize: 85,
    color: '#fff',
    fontWeight: '100'
  },
  circle: {
    fontSize: 35,
    color: '#fff',
    fontWeight: '300',
    position: 'absolute',
    top: 135,
    right: Util.size.width / 2 - 60
  },
  withinDay: {

  },
  withinDayGeneral: {
    flexDirection: 'row',
    width: Util.size.width
  },
  withinDayHead: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20
  },
  withinDayWeek: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '400',
    width: 50
  },
  withinDayDay: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '300',
    width: 50
  },
  withinDayTail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  withinDayHigh: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '200',
    width: 30
  },
  withinDayLow: {
    fontSize: 16,
    color: '#eee',
    fontWeight: '200',
    width: 30
  },
  withinDayLowNight: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '200',
    width: 30
  },
  withinDayHoursContainer: {
    marginTop: 3,
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderTopWidth: Util.pixel,
    borderBottomColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth:Util.pixel
  },
  withinDayHours: {
    paddingLeft: 7,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  withinWeek: {
    paddingTop: 5
  },
  weatherInfo: {
    marginTop: 5,
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderTopWidth: Util.pixel,
    borderBottomColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: Util.pixel
  },
  weatherInfoText: {
    color: '#fff',
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 20
  },
  weatherOther: {
    paddingTop: 10
  },
  weatherOtherSection: {
    paddingBottom: 10
  },
  weatherOtherLine: {
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  weatherOtherTitle: {
    width: Util.size.width / 2 -15,
    color: '#fff',
    textAlign: 'right',
    fontSize: 15
  },
  weatherOtherValue: {
    width: Util.size.width / 2,
    paddingLeft: 15,
    flex: 1,
    fontSize: 15,
    color: '#fff'
  },
  swiperPagination: {
    bottom: 10,
    paddingTop: 10,
    borderTopColor: 'rgba(255, 255, 255, 0.7)',
    borderTopWidth: Util.pixel
  },
  swiperDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginTop: 3,
    marginRight: 3,
    marginBottom: 3
  },
  swiperActiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginTop: 3,
    marginRight: 3,
    marginBottom: 3
  },
  backBtn: {
    position: 'absolute',
    right: 20,
    bottom: 7
  },
  backBtnIcon: {
    color: '#fff'
  }
})
