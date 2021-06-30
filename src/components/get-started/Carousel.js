import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, Animated, View } from 'react-native';
import { slider } from '../../constants/slider';
import { CarouselItem, NextButton, Paginator } from './components';

const Carousel = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const changeTo = index => {
    if (currentIndex < slider.length - 1) {
      slidesRef.current.scrollToIndex({ index: index });
    } else {
      navigation.replace('socialLogin', { crossIcon: false });
    }
  };
  const scrollTo = () => {
    if (currentIndex < slider.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('socialLogin', { crossIcon: false });
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slider}
          renderItem={({ item }) => <CarouselItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slider} scrollX={scrollX} scrollTo={i => changeTo(i)} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slider.length)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Carousel;
