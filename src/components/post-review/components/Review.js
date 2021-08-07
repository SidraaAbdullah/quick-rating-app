/* eslint-disable indent */
import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const Review = () => {
  return (
    <View style={styles.rating}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Review</Text>
      <View style={styles.MainTextInputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder={'Write your experience...'}
          placeholderTextColor={'gray'}
          numberOfLines={5}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rating: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainTextInputContainer: {
    borderRadius: 8,
    width: '100%',
    marginTop: 12,
    height: 150,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 3,
  },
  TextInput: {
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
export { Review };
