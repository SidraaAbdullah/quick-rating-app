/* eslint-disable indent */
import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const Review = ({ setComment, comment }) => {
  return (
    <View style={styles.rating}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Review</Text>
      <View style={styles.MainTextInputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder={'Write your experience...'}
          placeholderTextColor={'gray'}
          numberOfLines={5}
          onChangeText={e => {
            setComment(e);
          }}
          value={comment}
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
    elevation: 3,
  },
  TextInput: {
    padding: 10,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
export { Review };
