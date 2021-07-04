import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from './style';

const header = props => {
  return (<View style={styles.container}>
      <Text style={styles.text}>CHOOSE A CATEGORY</Text>
  </View>
  )
};

export default header;
