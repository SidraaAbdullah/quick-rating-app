import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';

const ApplePay = ({ navigation }) => {
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
            headingText={'Apple Pay'}
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
        <View style={{ marginTop: 50, marginHorizontal: 30 }}>
          <Text style={{ fontSize: 22, paddingBottom: 4,     fontFamily: 'ProximaNovaBold' }}>
            {i18n.t('pay_with_apple')}
          </Text>
          <Text style={{ fontSize: 16, color: '#1E272E', fontFamily: 'ProximaNova' }}>
            {i18n.t('app_acc')}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ApplePay;

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
  },
  btn_yellow: {
    backgroundColor: '#FCDF6F',
    width: 300,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
