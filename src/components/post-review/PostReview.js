/* eslint-disable indent */
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import { Header, Review, Rating } from './components';
const PostReview = ({ navigation, route }) => {
  return (
    <ScrollView>
      <View style={styles.viewProfile}>
        <Header navigation={navigation} route={route} />
      </View>
      <View style={styles.container}>
        <Rating />
        <Review />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.viewLastBtn}
      >
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
    </ScrollView>
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
});
export default PostReview;
