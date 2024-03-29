/* eslint-disable indent */
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './index';
import { Colors } from '../../constants/Theme';
import { ReviewSlider } from './index';
import Spinner from 'react-native-loading-spinner-overlay';

const Review = ({
  navigation,
  img,
  name,
  loading,
  restaurant,
  reviewData,
  reviewRefetch,
}) => {
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
              reviewRefetch,
            })
          }
          style={styles.btnAdd}
        >
          <AntDesign name="plus" size={16} color={Colors.fontDark} />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <Spinner visible={loading} />
        <FlatList
          data={reviewData?.data || []}
          renderItem={({ item }) => (
            <View style={{ marginRight: 7, marginBottom: 20, marginTop: 10 }}>
              <Text>
                {item?.comment && (
                  <ReviewSlider rating={+item.rating} item={item} />
                )}
              </Text>
            </View>
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
