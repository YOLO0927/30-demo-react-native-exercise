'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Platform, Image, StatusBar, StyleSheet, TouchableHighlight } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Util from '../public/utils'
import Icon from 'react-native-vector-icons/Ionicons'

export class Map extends Component {
  constructor () {
    super()
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      annotations: []
    }
  }

  _getAnnotations (region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'You Are Here',
      description: 'It is your hometown!'
    }]
  }

  _onRegionChangeComplete (region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        mapRegion: region,
        isFirstLoad: false
      })
    }
  }

  render () {
    return (
      <View>
        <MapView
          style={ this.props.mapStyle }
          mapType={ this.props.mapType }
          showsUserLocation={ this.props.showsUserLocation }
          followsUserLocation={ this.props.followsUserLocation }
          userLocationAnnotationTitle="我的位置"
          onRegionChangeComplete={ (region) => this._onRegionChangeComplete(region) }
          region={ this.state.mapRegion }
          annotations={ this.state.annotations }>
          {this.state.annotations.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </View>
    )
  }
}

Map.propTypes = {
  mapType: PropTypes.oneOf([ 'standard', 'satellite', 'hybrid' ]),
  showsUserLocation: PropTypes.bool.isRequired,
  followsUserLocation: PropTypes.bool.isRequired
}

Map.defaultProps = {
  mapType: 'standard',
  showsUserLocation: false,
  followsUserLocation: false
}

class Day5 extends Component {
  constructor () {
    super()
    this.state = {
      showLocation: false,
      followLocation: false
    }
  }

  componentDidMount () {
    if (Platform.os === 'ios') {
      StatusBar.setBarStyle('default')
    }
  }

  _getLocation () {
    // 官方文档已经写明 followUserLocation 的效果是伴随着 showsUserLocation 为 true 时变化的，所以我们此时要先改变 follow 再改变 show
    this.setState({
      followLocation: true
    })
    setTimeout(() => {
      this.setState({
        showLocation: true
      })
    })
  }

  render () {
    return (
      <View style={ styles.container }>
        <Map
          mapType="standard"
          mapStyle={ styles.map }
          showsUserLocation={ this.state.showLocation }
          followsUserLocation={ this.state.followLocation }
        />
        <TouchableHighlight underlayColor="#00bd03" style={ styles.btn } onPress={ () => this._getLocation() }>
          <Text style={ styles.btnText }>
            <Icon size={ 18 } name="ios-pin" />
            Find my location
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  map: {
    width: Util.size.width,
    height: Util.size.height - 120
  },
  btn: {
    backgroundColor: '#00a803',
    width: Util.size.width - 80,
    height: 40,
    borderWidth: Util.pixel,
    borderColor: '#009302',
    borderRadius: 4,
    justifyContent: 'center',
    marginTop: 10
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  }
})

export default Day5
