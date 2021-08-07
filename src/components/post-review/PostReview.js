/* eslint-disable indent */
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  ImageBackground,
} from 'react-native';
import { useMutation } from 'react-query';
import { Colors } from '../../constants/Theme';
import Context from '../../contextApi/context';
import GlobalHeader from '../GlobalHeader';
import { Review, Rating } from './components';
import { POST_REVIEW } from './queries';
const imgBg = require('../../assets/images/Group5.png');

const PostReview = ({ navigation, route }) => {
  const { state } = useContext(Context);

  const { img, name, restaurant } = route.params;
  const [rating, setRating] = useState();
  const [comment, setComment] = useState('');
  const [postReview] = useMutation(POST_REVIEW);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} style="dark" />
      <ImageBackground
        style={{
          width: '100%',
          height: 110,
        }}
        source={imgBg}
        resizeMode="stretch"
      >
        <GlobalHeader
          arrow={true}
          headingText={`${name} review`}
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
          <Rating rating={rating} setRating={setRating} />
          <Review comment={comment} setComment={setComment} />
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.viewLastBtn}
        onPress={() => {
          postReview(
            {
              comment,
              rating,
              user_id: state.userDetails.user_id,
              place: restaurant,
            },
            {
              onSuccess: () => {
                navigation.goBack(null);
              },
              onError: err => {
                alert(err);
              },
            },
          );
        }}
      >
        <Text style={styles.submitButton}>Submit</Text>
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
    overflow: 'hidden',
  },
  submitButton: {
    fontFamily: 'ProximaNova',
    fontSize: 16,
    color: Colors.fontDark,
  },
});
export default PostReview;
