import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './index';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme';

const TopCard = ({ onPress, name }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.viewItem,
        {
          marginBottom: 0,
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        },
      ]}
    >
      <View style={styles.viewIcon}>
        <Feather name="phone" size={18} color={Colors.yellow} />
      </View>
      <Text
        style={{
          fontFamily: 'ProximaNova',
          color: Colors.fontDark,
          fontSize: 14,
        }}
      >
        {name}
      </Text>

      <View
        style={{
          flex: 1,
          flexDirection: 'row-reverse',
        }}
      >
        <View style={[styles.viewIcon2]}>
          <FontAwesome name="angle-right" size={26} color={'grey'} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { TopCard };
