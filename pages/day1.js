/**
 * Day 1
 * A stop watch
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Platform, FlatList, StyleSheet, StatusBar, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native'
import Util from '../public/utils'

class WatchFace extends Component {
  render () {
    return (
      <View style={ styles.watchFaceContainer }>
        <Text style={ styles.sectionTime }>{ this.props.sectionTime }</Text>
        <Text style={ styles.totalTime }>{ this.props.totalTime }</Text>
      </View>
    )
  }
}

WatchFace.propTypes = {
  sectionTime: PropTypes.string.isRequired,
  totalTime: PropTypes.string.isRequired
}

class WatchControl extends Component {
  constructor (props) {
    super(props)
    this.state = {
      watchOn: false,
      startBtnText: '启动',
      startBtnColor: '#60B644',
      stopBtnText: '计次',
      underlayColor: '#fff'
    }
  }

  _startWatch () {
    if (!this.state.watchOn) {
      this.props.startWatch()
      this.setState({
        startBtnText: '停止',
        startBtnColor: '#ff0044',
        stopBtnText: '计次',
        underlayColor: '#eee',
        watchOn: true
      })
    } else {
      this.props.stopWatch()
      this.setState({
        startBtnText: '启动',
        startBtnColor: '#60B644',
        stopBtnText: '复位',
        underlayColor: '#eee',
        watchOn: false
      })
    }
  }

  _addRecord () {
    if (this.state.watchOn) {
      this.props.addRecord()
    } else {
      this.props.clearRecord()
      this.setState({
        stopBtnText: '计次'
      })
    }
  }

  render () {
    return (
      <View style={ styles.WatchControlContainer }>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableHighlight
            style={ styles.btnStop }
            underlayColor={ this.state.underlayColor }
            onPress={ () => this._addRecord() }>
            <Text style={ styles.btnStopText }>{ this.state.stopBtnText }</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableHighlight
            style={ styles.btnStart }
            underlayColor='#eee'
            onPress={ () => this._startWatch() }>
            <Text style={[ styles.btnStartText, { color: this.state.startBtnColor } ]}>{ this.state.startBtnText }</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

WatchControl.propTypes = {
  stopWatch: PropTypes.func.isRequired,
  clearRecord: PropTypes.func.isRequired,
  startWatch: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired
}


class WatchRecord extends Component {
  render () {
    let data = [...this.props.record]
    return (
      <FlatList
        style={ styles.recordList }
        data={data}
        keyExtractor={(item, index) => (`item${index}`)}
        renderItem={({item, index, separators}) => (
          <View style={ styles.recordItem }>
            <Text style={ styles.recordItemTitle }>{ item.title }</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={ styles.recordItemTime }>{ item.time }</Text>
            </View>
          </View>
        )}
      ></FlatList>
    )
  }
}

WatchRecord.propTypes = {
  record: PropTypes.array.isRequired
}

class Day1 extends Component {
  constructor () {
    super()
    this.state = {
      stopWatch: false,
      resetWatch: true,
      initialTime: 0,
      currentTime: 0,
      recordTime: 0,
      timeAccumulation: 0,
      totalTime: '00:00:00',
      sectionTime: '00:00:00',
      recordCounter: 0,
      record: []
    }
  }

  componentWillUnmount () {
    this._stopWatch()
    this._clearRecord()
  }

  componentDidMount() {
    if(Platform.OS === "ios"){
      StatusBar.setBarStyle('default');
    }
  }

  _addRecord () {
    let { recordCounter, record } = this.state
    recordCounter++
    record.unshift({ title: `计次${recordCounter}`, time: this.state.sectionTime })
    this.setState({
      recordTime: this.state.timeAccumulation + this.state.currentTime - this.state.initialTime,
      recordCounter: recordCounter,
      record: record
    })
  }

  _clearRecord () {
    this.setState({
      stopWatch: false,
      resetWatch: true,
      initialTime: 0,
      currentTime: 0,
      recordTime: 0,
      timeAccumulation: 0,
      totalTime: '00:00:00',
      sectionTime: '00:00:00',
      recordCounter: 0,
      record: []
    })
  }

  _startWatch () {
    if (this.state.resetWatch) {
      this.setState({
        stopWatch: false,
        resetWatch: false,
        timeAccumulation: 0,
        initialTime: (new Date()).getTime()
      })
    } else {
      this.setState({
        stopWatch: false,
        initialTime: (new Date()).getTime()
      })
    }
    let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime
    let interval = setInterval(() => {
      this.setState({
        currentTime: (new Date()).getTime()
      })
      countingTime = this.state.timeAccumulation + this.state.currentTime - this.state.initialTime
      minute = Math.floor(countingTime / (60 * 1000))
      second = Math.floor((countingTime - 60000 * minute) / 1000)
      milSecond = Math.floor((countingTime % 1000) / 10)
      seccountingTime = countingTime - this.state.recordTime
      secminute = Math.floor(seccountingTime / (60 * 1000))
      secsecond = Math.floor((seccountingTime - 60000 * secminute) / 1000)
      secmilSecond = Math.floor((seccountingTime % 1000) / 10)
      this.setState({
        totalTime: (minute < 10 ? `0${minute}` : minute) + ':' + (second < 10 ? `0${second}` : second) + '.' + (milSecond < 10 ? `0${milSecond}` : milSecond),
        sectionTime:  (secminute < 10 ? `0${secminute}` : secminute) + ':' + (secsecond < 10 ? `0${secsecond}` : secsecond) + '.' + (secmilSecond < 10 ? `0${secmilSecond}` : secmilSecond)
      })
      if (this.state.stopWatch) {
        this.setState({
          timeAccumulation: countingTime
        })
        clearInterval(interval)
      }
    }, 50)
  }

  _stopWatch () {
    this.setState({
      stopWatch: true
    })
  }

  render () {
    return (
      <ScrollView style={ styles.watchContainer }>
        <WatchFace totalTime={ this.state.totalTime } sectionTime={ this.state.sectionTime }></WatchFace>
        <WatchControl
          addRecord={ () => this._addRecord() }
          clearRecord={ () => this._clearRecord() }
          startWatch={ () => this._startWatch() }
          stopWatch={ () => this._stopWatch() }
          ></WatchControl>
        <WatchRecord record={ this.state.record }></WatchRecord>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  watchFaceContainer: {
    width: Util.size.width,
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 170
  },
  sectionTime: {
    fontSize: 20,
    fontWeight: '100',
    paddingRight: 30,
    color: '#555',
    position: 'absolute',
    left: 200,
    top: 30
  },
  totalTime: {
    fontSize: Util.size.width === 375 ? 70 : 60,
    fontWeight: '100',
    color: '#222',
    paddingLeft: 20
  },
  WatchControlContainer: {
    width: Util.size.width,
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 0
  },
  btnStart: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStop: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStartText: {
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  btnStopText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#555'
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 300,
    paddingLeft: 15
  },
  recordItem: {
    height: 40,
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#bbb',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  recordItemTitle: {
    backgroundColor: 'transparent',
    flex: 1,
    textAlign: 'left',
    paddingLeft: 20,
    color: '#777'
  },
  recordItemTime: {
    backgroundColor: 'transparent',
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
    color: '#222'
  },
  watchContainer: {
    backgroundColor: '#f3f3f3'
  }
})

export default Day1
