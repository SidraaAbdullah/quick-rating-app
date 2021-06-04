import React, { FC } from 'react';
import Svg, { Circle, ClipPath, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

export const SvgHeaderUserIcon: FC<SvgHeaderUserIconProps> = (props: SvgHeaderUserIconProps) => {
  const { height } = props;

  return (
    <Svg width={height} height={height} viewBox="0 0 54 54">
      <Defs>
        <ClipPath id="prefix__b">
          <Circle cx={25} cy={25} r={25} fill="#ffe685" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} />
        </ClipPath>
        <ClipPath id="prefix__c">
          <Path
            data-name="Combined Shape"
            d="M-13.775 21.958c-.019 1.467-1.233 2.578-3.642 3.3 2.9 2.1 5.806 3.771 8.708 3.771S-2.9 27.353 0 25.258q-3.589-1.084-3.641-3.237c0-.256.017-5.876.028-8.328 2.269-2.919 1.436-6.342.724-6.256-.873.1-8.425-7.009-9.874-7.373a5.4 5.4 0 00-5.762 4.092c-.633 3.28-.9 11.549 1.5 14.85a3.165 3.165 0 003.246 1.1c.006.687.004 1.852.004 1.852z"
            transform="translate(0 .008)"
            fill="url(#prefix__a)"
          />
        </ClipPath>
        <LinearGradient id="prefix__a" x1={0.5} x2={0.5} y2={1} gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#ffeadd" />
          <Stop offset={1} stopColor="#ffe0cb" />
        </LinearGradient>
      </Defs>
      <G data-name="Mask" fill="#ffe685" stroke="#fff" strokeMiterlimit={10} strokeWidth={2} transform="translate(2 2)">
        <Circle cx={25} cy={25} r={25} stroke="none" />
        <Circle cx={25} cy={25} r={26} fill="none" />
      </G>
      <G data-name="Bitmap" clipPath="url(#prefix__b)" transform="translate(2 2)">
        <G data-name="Group 10">
          <G data-name="Group 11">
            <G data-name="Group 2">
              <G data-name="Group 14">
                <G data-name="Path 48">
                  <Path
                    data-name="Combined Shape"
                    d="M-13.775 21.958c-.019 1.467-1.233 2.578-3.642 3.3 2.9 2.1 5.806 3.771 8.708 3.771S-2.9 27.353 0 25.258q-3.589-1.084-3.641-3.237c0-.256.017-5.876.028-8.328 2.269-2.919 1.436-6.342.724-6.256-.873.1-8.425-7.009-9.874-7.373a5.4 5.4 0 00-5.762 4.092c-.633 3.28-.9 11.549 1.5 14.85a3.165 3.165 0 003.246 1.1c.006.687.004 1.852.004 1.852z"
                    transform="translate(33.708 9.522)"
                    fill="url(#prefix__a)"
                  />
                  <G data-name="Path 48" clipPath="url(#prefix__c)" transform="translate(33.708 9.514)">
                    <Path data-name="Path 48" d="M-13.775 20.115a13.8 13.8 0 005.7-1.886 8.821 8.821 0 01-5.7 3.771z" fill="#db6f3d" />
                  </G>
                </G>
                <Path
                  data-name="Path 22"
                  d="M31.252 23.261c1.093-2.6 5.465-7.9 1.7-11.2-1.27-6.132-8.268-5.454-12.939-4.04-3.139.951-5.51 2.829-6.017 1.414-3.167 2.626-1.581 5.186.507 5.926 1.895.668 5.1 1.336 10.546.707.973-.112.769 2.846 1.289 3.165.78.48 1.386-2.537 3.524-1.631s.87 5.106-1.426 5.106c-.792 0-1.187 2.16.95 3.182 1.552.753 1.16-.929 1.866-2.629z"
                  fill="#191919"
                />
              </G>
            </G>
          </G>
        </G>
        <G data-name="Group 21">
          <Path
            data-name="Combined Shape"
            d="M41.625 39.577C43.132 42.614 44 49.634 44 49.634H6s.868-7.02 2.375-10.057 10.307-5.863 10.307-5.863c1.7 3.457 11.006 3.456 12.63 0 .001 0 8.806 2.821 10.313 5.863z"
            fill="#1e272e"
          />
        </G>
      </G>
    </Svg>
  );
};

export interface SvgHeaderUserIconProps {
  height: number | string;
}
