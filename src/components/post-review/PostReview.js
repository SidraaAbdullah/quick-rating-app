/* eslint-disable indent */
import React from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Colors } from '../../constants/Theme';
import { Header, Review, Rating } from './components';
const PostReview = () => {
  return (
    <ScrollView>
      <View style={styles.viewProfile}>
        <Header />
      </View>
      <View style={styles.container}>
        <Rating/>
        <Review/>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
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
