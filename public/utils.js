import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions'

const Util = {
  navHeight: 43.5,
  tabbarHeight: 50,
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
}

export default Util
