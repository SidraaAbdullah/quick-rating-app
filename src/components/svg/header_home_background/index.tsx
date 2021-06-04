import React, { FC } from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

export const SvgHeadeHomeBackground: FC<SvgHeadeHomeBackgroundProps> = (props: SvgHeadeHomeBackgroundProps) => {
  const { height } = props;

  return (
    <Svg viewBox="0 0 375 190">
      <Defs>
        <ClipPath id="prefix__a">
          <Path d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z" transform="translate(0 .981)" fill="#fcdf6f" />
        </ClipPath>
      </Defs>
      <Path data-name="Mask" d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z" fill="#fcdf6f" />
      <G data-name="BG" clipPath="url(#prefix__a)" transform="translate(0 -.981)">
        <Path
          data-name="Weird Shape"
          d="M238.418-41.74c59.628-43.534 217.933 62.136 224.724 167.256s-148.41 240.355-200.258 210.42 13.883-143.786 11.81-189.565S178.788 1.791 238.417-41.74z"
          fill="#ffe685"
        />
      </G>
    </Svg>
  );
};

export interface SvgHeadeHomeBackgroundProps {
  height: number | string;
}
