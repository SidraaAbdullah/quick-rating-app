/* eslint-disable indent */
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
const imgBg = require('../../../assets/images/Group5.png');
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../../constants/Theme';

const Header = () => {
  return (
    <ImageBackground
      style={{ width: '100%', height: 'auto', paddingBottom: 50 }}
      source={imgBg}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerHeading}>Cancel</Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>New Review</Text>
          </View>
          <View>
            <Text style={styles.headerHeading}>Post</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.image}>
          <FontAwesome name="user-circle-o" size={100} color="#fff" />
        </View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.name}>
          Person Name
        </Text>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  headerHeading: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    color: Colors.fontDark,
    maxWidth: '80%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
});
export { Header };
