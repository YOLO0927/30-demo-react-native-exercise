import React, { Component } from 'react'
import { Text } from 'react-native'

class Greeting extends Component {
  render () {
    return (
      <Text style={{ color: this.props.color }}>Hello { this.props.children }!</Text>
    )
  }
}

export default Greeting
