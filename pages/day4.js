'use strict'
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Util from '../public/utils'

class Day4 extends Component {
  render () {
    return (
      <View style={{ width: Util.size.width, height: Util.size.height }}>
        <Text style={ styles.middle }>day4 is coming soon</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  middle: {
    textAlignVertical: 'center',
    lineHeight: Util.size.height - 50,
    textAlign: 'center'
  }
})

export default Day4
