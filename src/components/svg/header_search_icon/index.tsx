import React, { FC } from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { HEADER_BAR_HEIGHT } from '../../../constants/layout';

export const SvgHeaderSearchIcon: FC = ({ onPress, hitSlop }) => {
  return (
    <Svg
      width={HEADER_BAR_HEIGHT / 2}
      height={18}
      viewBox="0 0 20.414 20.414"
      onPress={onPress}
      hitSlop={hitSlop}
    >
      <G
        data-name="search (1)"
        transform="translate(1 1)"
        fill="none"
        stroke="#FCDF6F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <Circle cx={8} cy={8} r={8} />
        <Path d="M18 18l-4.35-4.35" />
      </G>
    </Svg>
  );
};
