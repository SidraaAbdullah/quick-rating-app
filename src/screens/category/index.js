import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
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
    heightt: 150,
    widthh: 300,
    color: '#d60e64',
    image: restaurants,
    category: 'restaurant',
  },
];

const lineThree = [
  {
    title: 'Pharmacy',
    text: 'get your medicines first',
    heightt: 150,
    widthh: 300,
    color: '#ef9fc2',
    category: 'pharmacy',
    image: pharmacy,
  },
];

const lineFive = [
  {
    title: 'Amusement Park',
    text: 'Feel your life',
    heightt: 150,
    widthh: 300,
    category: 'amusement_park',
    color: '#CCFF99',
    image: park,
  },
];

const lineTwo = [
  {
    title: 'Gym',
    text: 'gym lover',
    heightt: 150,
    widthh: 150,
    color: '#fed271',
    category: 'gym',
    image: gym,
  },
  {
    title: 'cafe',
    text: 'order your coffee',
    heightt: 150,
    widthh: 150,
    color: '#FFE5CC',
    category: 'cafe',
    image: cafe,
  },
];

const lineFour = [
  {
    title: 'Barber Shop',
    text: "style's everything",
    heightt: 150,
    widthh: 150,
    color: 'white',
    category: 'beauty_salon',
    image: saloon,
  },
  {
    title: 'Supermarket',
    text: 'purchasing',
    heightt: 150,
    widthh: 150,
    color: '#85bfff',
    category: 'supermarket',
    image: supermarket,
  },
];

const Boxes = props => {
  return (
    <ScrollView>
          <View style={styles.panel}>
      <FlatList
        data={lineOne}
        renderItem={({ item }) => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.color}
      />
      
      <FlatList
        data={lineTwo}
        numColumns={2}
        renderItem={({ item }) => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.color}
      />
      <FlatList
        data={lineThree}
        renderItem={({ item }) => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.color}
      />

<FlatList
        data={lineFour}
        numColumns={2}
        renderItem={({ item }) => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.color}
      />


      <FlatList
        data={lineFive}
        renderItem={({ item }) => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.color}
      />
    </View>
    </ScrollView>

  );
};

export const styles = StyleSheet.create({
  // panel: {
  //   backgroundColor:'blue',
  //   // height:'100%'
   
  // },
});

export default Boxes;
