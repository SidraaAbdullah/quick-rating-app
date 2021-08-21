/* eslint-disable indent */
import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import RatingStar from '../../components/RatingComponent';
import ReadMore from 'react-native-read-more-text';

const ReviewSlider = ({ item, rating }) => {
  const obj = [1, 2, 3, 4, 5];
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <View pointerEvents="none" style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            {obj.map((v, i) => {
                return (
                    <TouchableOpacity key={i}>
                      <RatingStar
                        starSize={17}
                        type={
                          v <= rating
                            ? 'filled'
                            : v === rating + 0.5
                            ? 'half'
                            : 'empty'
                        }
                        notRatedStarColor="rgba(255,255,255, 0.6)"
                      />
                    </TouchableOpacity>
                );
            })}
        </View>
        {item.isGoogle ? (
           <Image
                source={item.image}
                style={[styles.image]}
        />
        ) : null}
      </View>
      <View>
        <TouchableOpacity>
          <ReadMore numberOfLines={4}>
            <Text style={styles.description}>{item.description}</Text>
          </ReadMore>
        </TouchableOpacity>
      </View>
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
