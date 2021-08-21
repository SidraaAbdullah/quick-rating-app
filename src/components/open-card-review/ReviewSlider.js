/* eslint-disable indent */
import React, {useState} from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import RatingStar from '../../components/RatingComponent';
import ReadMore from 'react-native-read-more-text';
import ReviewModal from '../../components/modals/ReviewModal';

const ReviewSlider = ({ item, rating }) => {
  const obj = [1, 2, 3, 4, 5];
  const [isOpen, setIsOpen]=useState(false);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <View pointerEvents="none" style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                      notRatedStarColor="rgba(255,255,255, 0.6)"
                  />
                );
            })}
        </View>
        {item.isGoogle ? (
           <Image
            source={item.image}
            style={styles.image}
        />
        ) : null}
      </View>
      <View>
        <TouchableOpacity onPress={()=>setIsOpen(true)}>
          <ReadMore numberOfLines={4}>
            <Text style={styles.description}>{item.description}</Text>
          </ReadMore>
        </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 12,
    paddingBottom: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    marginHorizontal: 5,
    elevation: 3,
    width: 260,
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
