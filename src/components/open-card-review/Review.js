/* eslint-disable indent */
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './index';
import { Colors } from '../../constants/Theme';
import { reviewSlider } from '../../constants/slider';
import { ReviewSlider } from './index';
const Review = ({ navigation, img, name, rating, restaurant }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          alignItems: 'center',
        }}
      >
        <Text style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}>
          Review
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            navigation.navigate('restaurantReview', {
              img,
              name,
              restaurant,
            })
          }
          style={styles.btnAdd}
        >
          <AntDesign name="plus" size={16} color={Colors.fontDark} />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <FlatList
          data={reviewSlider}
          renderItem={({ item }) => (
            <ReviewSlider rating={rating} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export { Review };
