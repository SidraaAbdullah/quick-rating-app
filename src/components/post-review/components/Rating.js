/* eslint-disable indent */
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import RatingStar from '../../../components/RatingComponent';

const Rating = () => {
  const [rating, setRating] = useState();
  const obj = [1, 2, 3, 4, 5];

  return (
    <View style={styles.rating}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, paddingBottom: 5 }}>
        Ratings
      </Text>
      <Text style={{ color: 'gray', fontWeight: 'bold' }}>
        Rate your experience
      </Text>
      <View style={styles.ratingBox}>
        <View style={styles.ratingStar}>
          {obj.map((v, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setRating(v);
                }}
              >
                <RatingStar
                  padding={true}
                  starSize={25}
                  type={
                    v <= rating
                      ? 'filled'
                      : v === rating + 0.5
                      ? 'half'
                      : 'empty'
                  }
                  notRatedStarColor="rgba(0,0,0,0.2)"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  rating: {
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBox: {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 15,
  },
  ratingStar: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 2,
  },
});
export { Rating };
