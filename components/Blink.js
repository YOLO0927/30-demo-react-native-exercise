import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class Blink extends Component {
  constructor (props) {
    super(props)
    this.state = { showText: props.showText }
  }

  render () {
    const onPressHandler = () => {
      this.setState({
        showText: !this.state.showText
      })
    }
    let btnText = this.state.showText ? '隐藏' : '显示'
    return (
      <View>
        <Button
          onPress={onPressHandler}
          title={btnText}
          color="#841584"
        />
      <Text>{ this.state.showText ? this.props.children : '' }</Text>
      </View>
    )
  }
}

export default Blink
