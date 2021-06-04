import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/ThanksGiving.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import NumberFormat from 'react-number-format';

const ThanksRatingModal = ({ isVisible, handleModalClose, LotteryNumber }) => {
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
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
              height: 140,
              borderRadius: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              alignSelf: 'center',
              marginBottom: -70,
              bottom: -20,
            }}
          />
          <Image
            source={imgWaiter}
            style={styles.imgStyle}
            resizeMode="cover"
          />
        </View>
      </ImageBackground>

      <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
        {i18n.t('thanks_for_vote')}
      </Text>
      <Text style={[styles.txtName, { fontFamily: 'ProximaNova' }]}>
        {i18n.t('will_contact_by_email')}
      </Text>
      {LotteryNumber ? (
        <NumberFormat
          value={pad(LotteryNumber, 8, '0')}
          allowEmptyFormatting
          displayType={'text'}
          format="####-####"
          renderText={formattedValue => (
            <Text style={styles.lottery}>{formattedValue}</Text>
          )}
        />
      ) : (
        <Text style={styles.lottery}>XXXX-XXXX</Text>
      )}
    </Overlay>
  );
};

export default ThanksRatingModal;

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
    // overflow:"hidden"
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    height: 45,
  },
  txtConfrm: {
    fontSize: 24,
    color: Colors.fontDark,
    marginTop: 20,
    textAlign: 'center',
  },
  txtName: {
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 12,
    width: 270,
    textAlign: 'center',
    marginBottom: 20,
  },
  imgStyle: {
    width: 210,
    height: 200,
    alignSelf: 'center',
    marginTop: -109,
    marginRight: -20,
  },
  viewImg: {
    width: '100%',
    height: 240,
    // backgroundColor:"red"
  },
  lottery: {
    width: '80%',
    backgroundColor: '#fcf4e4',
    borderRadius: 10,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e6c33d',
    fontWeight: 'bold',
  },
});
