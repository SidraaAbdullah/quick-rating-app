/* eslint-disable indent */
import React from 'react';
import RatingStar from '../../components/RatingComponent';
import GlobalHeader from '../../components/GlobalHeader';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { View, ImageBackground, Text, Animated, TouchableOpacity } from 'react-native';
import { styles } from './index';

const HeaderImage = ({ route, navigation, translateY }) => {
    const obj = [1, 2, 3, 4, 5];
    const {img, name, rating, distance} = route?.params;
    return (
    <View>
      <StatusBar translucent={true} style="light" />
      <GlobalHeader
        arrow={true}
        headingText={name}
        fontSize={17}
        color={'#fff'}
        bold={true}
        BackIconColor={'#fff'}
        backgroundColor={'transparent'}
        position="absolute"
        navigation={navigation}
      />
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          elevation: 0,
          zIndex: 9,
        }}
      >
        <View style={styles.viewImg}>
          <ImageBackground
            source={{ uri: img ||
                'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=400' }}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            <LinearGradient
              style={{
                zIndex: 101,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              colors={['black', 'transparent', 'black']}
            ></LinearGradient>
            <View style={[styles.viewBottom, { zIndex: 102 }]}>
              <View pointerEvents="none" style={{ flexDirection: 'row' }}>
                {obj.map((v, i) => {
                  return (
                    <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                      <RatingStar
                        starSize={17}
                        type={
                          v <= rating
                            ? 'filled'
                            : v === rating + 0.5
                              ? 'half'
                              : 'empty'
                        }
                        notRatedStarColor="rgba(255,255,255, 0.6)"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'ProximaNova',
                    fontSize: 16,
                  }}
                >
                  {distance ? distance + 'm' : ''}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Animated.View>
    </View>
  );
};

export { HeaderImage };
