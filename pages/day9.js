'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Util from '../public/utils'

class Day9 extends Component {
  render () {
    let title = this.props.navigation.state.params.title
    return (
      <View style={{ width: Util.size.width, height: Util.size.height - Util.navHeight }}>
        <Text style={ styles.middle }>{ title } is coming soon</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  middle: {
    textAlignVertical: 'center',
    lineHeight: Util.size.height - Util.navHeight,
    textAlign: 'center'
  }
})

export default Day9
