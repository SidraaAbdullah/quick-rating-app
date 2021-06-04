import React, { useState } from 'react';
// import { KeyboardAvoidingView, StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';

const PaypalPayment = ({ navigation }) => {
  const [text, onChangeText] = useState();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={'Paypal'}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 7 }}>
        <View
          style={{
            marginTop: 60,
            alignItems: 'center',
          }}
        >
          <TextInput
            style={styles.inputsTopTow}
            onChangeText={onChangeText}
            value={text}
            placeholder="christine@zhou.com"
            keyboardType="email-address"
            placeholderTextColor={'#485460'}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.5} style={styles.btn_yellow}>
          <Text style={{ fontSize: 15, fontFamily: 'ProximaNova' }}>
            {i18n.t('delete_paypal')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaypalPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  inputsTopTow: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: 270,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
  },
  btn_yellow: {
    backgroundColor: '#FCDF6F',
    width: 300,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    fontFamily: 'ProximaNova',
  },
});
