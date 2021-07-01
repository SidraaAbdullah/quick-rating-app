import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';

const CarouselItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      {item.lottie ? (
        <LottieView
          source={item.lottie}
          autoPlay
          loop
          style={[
            {
              width: (width * 1) / 1.4,
              resizeMode: 'contain',
              marginBottom: 70,
            },
          ]}
        />
      ) : (
        <Image
          source={item.image}
          style={[styles.image, { width, resizeMode: 'contain' }]}
        />
      )}
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    height: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
export { CarouselItem };
