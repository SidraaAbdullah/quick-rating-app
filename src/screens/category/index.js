import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import gym from '../../assets/images/gym.png';
import restaurants from '../../assets/images/restaurant.png';
import park from '../../assets/images/park.png';
import cafe from '../../assets/images/cafe.png';
import pharmacy from '../../assets/images/pharmacy.png';
import supermarket from '../../assets/images/supermarket.png';
import saloon from '../../assets/images/salon.png';

const RenderCategory = ({ title, text, heightt, widthh, color, image }) => {
  return (
    <View
      style={[
        styles.boxes,
        { height: heightt, width: widthh, backgroundColor: color },
      ]}
    >
      <View style={styles.inner}>
        <Image source={image} style={{ width: 70, height: 70 }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const catInfo = [
  {
    title: 'Restaurants',
    text: 'order food you love',
    heightt: 150,
    widthh: 300,
    color: '#d60e64',
    image: restaurants,
  },
  {
    title: 'Gym',
    text: 'gym lover',
    heightt: 150,
    widthh: 150,
    color: '#fed271',
    image: gym,
  },
  {
    title: 'cafe',
    text: 'order your coffee',
    heightt: 150,
    widthh: 150,
    color: '#FFE5CC',
    image: cafe,
  },
  {
    title: 'Pharmacy',
    text: 'get your medicines first',
    heightt: 150,
    widthh: 300,
    color: '#ef9fc2',
    image: pharmacy,
  },
  {
    title: 'Barber Shop',
    text: "style's everything",
    heightt: 150,
    widthh: 150,
    color: 'white',
    image: saloon,
  },
  {
    title: 'Supermarket',
    text: 'purchasing',
    heightt: 150,
    widthh: 150,
    color: '#85bfff',
    image: supermarket,
  },
  {
    title: 'Amusement Park',
    text: 'Feel your life',
    heightt: 150,
    widthh: 300,
    color: '#CCFF99',
    image: park,
  },
];

const Boxes = () => {
  return (
    <View style={styles.container}>
      <Text>
        {catInfo.map(item => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
          />
        ))}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    // backgroundColor: "orange",
    height: '200%',
    width: '90%',
    flexDirection: 'row',
    padding: 5,
    flexWrap: 'wrap',
    left: 25,
    position: 'relative',
  },
  boxes: {
    fontSize: 16,
    backgroundColor: 'pink',
    margin: '10%',
    borderRadius: 10,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 5,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Boxes;
