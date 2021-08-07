/* eslint-disable indent */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import GlobalHeader from '../GlobalHeader';
import { Header, Review, Rating } from './components';
const imgBg = require('../../assets/images/Group5.png');

const PostReview = ({ navigation, route }) => {
  const { img } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} style="dark" />
      <ImageBackground
        style={{
          width: '100%',
          height: 120,
        }}
        source={imgBg}
        resizeMode="stretch"
      >
        <GlobalHeader
          arrow={true}
          headingText="Restaurant review"
          fontSize={17}
          color={'black'}
          bold={true}
          BackIconColor={'black'}
          backgroundColor={'transparent'}
          position="absolute"
          navigation={navigation}
        />
      </ImageBackground>
      <ScrollView>
        <View style={styles.viewImg}>
          <ImageBackground
            source={{
              uri:
                img ||
                'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=400',
            }}
            style={{ flex: 1, justifyContent: 'space-between' }}
          ></ImageBackground>
        </View>
        <View style={styles.container}>
          <Rating />
          <Review />
        </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={0.5} style={styles.viewLastBtn}>
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 16,
            color: Colors.fontDark,
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  viewLastBtn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.yellow,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    marginTop: 1,
  },
  container: {
    padding: 20,
    marginTop: 10,
    justifyContent: 'center',
  },
  viewProfile: {
    backgroundColor: Colors.yellow,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 0,
  },
  viewImg: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,

    overflow: 'hidden',
  },
});
export default PostReview;
