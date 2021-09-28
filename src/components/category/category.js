import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import cafe from './../../assets/images/cafe.json';

const RenderCategory = props => {
  const {
    title,
    text,
    heightt,
    widthh,
    color,
    image,
    category,
    navigation,
    lottie,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('Home', { category })}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.boxes,
            {
              height: heightt,
              width: widthh,
              margin: 15,
              backgroundColor: color,
            },
          ]}
        >
          <View style={styles.inner}>
            {lottie ? (
              <LottieView
                source={lottie}
                autoPlay
                loop
                style={[
                  {
                    width: 120,
                    height: 120,
                    resizeMode: 'contain',
                    // marginBottom: 70,
                  },
                ]}
              />
            ) : (
              <Image source={image} style={{ width: 70, height: 70 }} />
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderCategory;
