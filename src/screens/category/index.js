import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image, useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RenderCategory from './../../components/category/category';
import gym from '../../assets/images/gym.png';
import restaurants from '../../assets/images/restaurant.png';
import park from '../../assets/images/park.png';
import cafe from '../../assets/images/cafe.png';
import pharmacy from '../../assets/images/pharmacy.png';
import supermarket from '../../assets/images/supermarket.png';
import saloon from '../../assets/images/salon.png';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const lineOne = [
  {
    title: 'Restaurants',
    text: 'order food you love',
    color: '#c88ad8e5',
    image: restaurants,
    category: 'restaurant',
    lottie: require('../../assets/lottie/restaurant.json'),
  },
  {
    title: 'Gym',
    text: 'gym lover',
    width: 2.4,
    color: '#fed271',
    category: 'gym',
    image: gym,
    lottie: require('../../assets/lottie/gym.json'),
  },
  {
    title: 'cafe',
    text: 'order your coffee',
    width: 2.4,
    color: '#FFE5CC',
    category: 'cafe',
    image: cafe,
    lottie: require('../../assets/lottie/cafe.json'),
  },
  {
    title: 'Pharmacy',
    text: 'get your medicines first',
    color: '#ef9fc2',
    category: 'pharmacy',
    lottie: require('../../assets/lottie/pharmacy.json'),
    image: pharmacy,
  },

  {
    title: 'Barber Shop',
    text: "style's everything",
    lottie: require('../../assets/lottie/beauty-parlour.json'),
    width: 2.4,
    color: 'white',
    category: 'beauty_salon',
    image: saloon,
  },
  {
    title: 'Supermarket',
    text: 'purchasing',
    width: 2.4,
    color: '#85bfff',
    lottie: require('../../assets/lottie/supermarket.json'),
    category: 'supermarket',
    image: supermarket,
  },
  {
    title: 'Amusement Park',
    text: 'Feel your life',
    lottie: require('../../assets/lottie/park.json'),
    category: 'amusement_park',
    color: '#CCFF99',
    image: park,
  },
];

const Boxes = props => {
  const { width } = useWindowDimensions();
  return (
    <ScrollView>
      <View style={styles.panel}>
        {lineOne.map(item => (
          <RenderCategory
            title={item.title}
            text={item.text}
            // heightt={item.heightt}
            widthh={item.width ? (width * 1) / item.width : (width * 1) / 1.1}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
            lottie={item.lottie}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  panel: {
    width: '100%',
    // height:'100%'
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Boxes;
