import { Dimensions, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const LAYOUT = {
  window: {
    width,
    height,
  },
};

export const RADIUS = 8;

export const spacing = (value: number): number => {
  const marginValue = isIphoneX() ? 12 : 8;
  return value * 8;
};

// export const HEADER_BAR_HEIGHT = Platform.select({
//   ios: 56,
//   android: 50,
//   default: 64,
// });

export const HEADER_BAR_HEIGHT = Platform.select({
  ios: 40,
  android: 40,
  default: 40,
});
