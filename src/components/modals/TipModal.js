import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/payment.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';

const TipModal = ({
  isVisible,
  handleModalClose,
  handlePayCash,
  handlePayDigital,
  loading,
}) => {
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={handleModalClose}
            style={{ alignSelf: 'flex-end', margin: 10 }}
          >
            <AntDesign name="close" size={29} color="#485460" />
          </TouchableOpacity>
          <View
            style={{
              width: 140,
              height: 130,
              alignSelf: 'center',
              marginBottom: -70,
              bottom: -20,
            }}
          />
          <Image
            source={imgWaiter}
            style={styles.imgStyle}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
        {i18n.t('pay_your_tip')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90%',
          marginVertical: 15,
        }}
      >
        <TouchableOpacity
          disabled={loading}
          onPress={handlePayCash}
          style={[styles.btnTipModal, { paddingVertical: loading ? 14 : 16 }]}
          activeOpacity={0.5}
        >
          {loading ? (
            <ActivityIndicator size={25} color="#EBC11B" />
          ) : (
            <Text style={styles.txtTipModal}>{i18n.t('cash')}</Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={handlePayDigital}
          style={styles.btnTipModal}
          activeOpacity={0.5}
        >
          <Text style={styles.txtTipModal}>{i18n.t('digital')}</Text>
        </TouchableOpacity> */}
      </View>
    </Overlay>
  );
};

export default TipModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgBgStyle: {
    width: '100%',
    height: 240,
  },
  txtConfrm: {
    fontSize: 24,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  imgStyle: {
    width: 210,
    height: 180,
    alignSelf: 'center',
    marginTop: -52,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  btnTipModal: {
    backgroundColor: '#FFE685',
    paddingHorizontal: 25,
    borderRadius: 10,
    width: 'auto',
    minWidth: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  txtTipModal: {
    color: '#000',
    fontSize: 17,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
  },
});
