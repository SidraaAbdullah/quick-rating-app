/* eslint-disable indent */
import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import RatingStar from '../RatingComponent';
import ReviewModal from '../modals/ReviewModal';

const ReviewSlider = ({ item, rating }) => {
  const obj = [1, 2, 3, 4, 5];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setIsOpen(true)} style={styles.container}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <View
            pointerEvents="none"
            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
          >
            {obj.map((v, i) => {
              return (
                <RatingStar
                  starSize={17}
                  key={i}
                  type={
                    v <= rating
                      ? 'filled'
                      : v === rating + 0.5
                      ? 'half'
                      : 'empty'
                  }
                  notRatedStarColor="lightgray"
                />
              );
            })}
          </View>
          {item.isGoogle ? (
            <Image
              source={require('../../assets/images/google.png')}
              style={styles.image}
            />
          ) : null}
        </View>
        <View>
            <Text numberOfLines={5} style={styles.description}>
              {item?.comment}
            </Text>
        </View>
        {isOpen && (
          <ReviewModal
            isVisible={isOpen}
            handleModalClose={() => setIsOpen(false)}
            rating={rating}
            item={item}
            obj={obj}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 12,
    paddingBottom: 16,
    elevation: 1,
    width: 260,
    height: 150,
  },
  image: {
    justifyContent: 'flex-end',
    width: 20,
    height: 20,
  },
  description: {
    fontWeight: '300',
    color: 'black',
  },
});
export { ReviewSlider };
