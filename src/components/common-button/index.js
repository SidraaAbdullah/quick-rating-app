import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const CommonButton = props => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      // disabled={loading}
      onPress={() => {
        props.navigation &&
          navigation.navigate(
            props.navigation,
            props.navigationData && props.navigationData,
          );
        props.dispatch && props.dispatch();
      }}
      style={styles.btnValider}
    >
      <LinearGradient
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 8,
        }}
        colors={[Colors.yellow, Colors.yellow, Colors.lightYellow]}
      />
      {loading ? (
        <ActivityIndicator size={29} color="#EBC11B" />
      ) : (
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16 }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  btnValider: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 3,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
