import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // Keyboard,
  TextInput,
  Dimensions,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
import i18n from '../../li8n';
const imgWaiter = require('../../assets/images/sittingtable.png');
const imgBg = require('../../assets/images/Group7.png');
const validator = require('validator');
import { FontAwesome5 } from '@expo/vector-icons';

const ConfirmationModal = ({
  handleModalClose,
  postData,
  loading,
  isVisible,
}) => {
  const [placeholderWaiterName, setPlaceholderWaiterName] = React.useState(
    i18n.t('name_of_your_server'),
  );
  const [placeholderEmail, setPlaceholderEmail] = React.useState(
    i18n.t('waiter_email'),
  );

  const [waiterName, setwaiterName] = useState('');
  const [email, setEmail] = useState('');

  const ValidateDisable = () => {
    if (loading) {
      return true;
    }
    if (waiterName && email && validator?.isEmail(email)) {
      return false;
    } else {
      return true;
    }
  };
  const ValidateButtonColor = () => {
    if (waiterName && email && validator?.isEmail(email)) {
      return {
        backgroundColor: Colors.yellow,
      };
    } else {
      return {};
    }
  };

  const HandlePostData = async () => {
    await postData(waiterName, email);
    resetPlaceholder();
  };

  const resetPlaceholder = () => {
    setwaiterName('');
    setEmail('');
    if (Platform.OS != 'ios') {
      setPlaceholderWaiterName('name_of_your_server');
      setPlaceholderEmail('');
    }
  };
  let emailError = email && !validator?.isEmail(email);

  return (
    <Overlay
      overlayStyle={[styles.container]}
      isVisible={isVisible}
      onBackdropPress={() => {
        handleModalClose();
        resetPlaceholder();
      }}
    >
      <ScrollView
        // ref={scrollRef}
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        scrollEnabled={false}
        style={{
          width: '100%',
        }}
      >
        <KeyboardAvoidingView
          // style={ keyboardVisible && { marginBottom: -190 }}
          keyboardVerticalOffset={
            Dimensions.get('window').height <= 645 ? 10 : 25
          }
          behavior="position"
          enabled
        >
          <View style={{ alignItems: 'center' }}>
            <ImageBackground
              style={styles.imgBgStyle}
              source={imgBg}
              resizeMode="stretch"
            >
              <View style={styles.viewImg}>
                <Image
                  source={imgWaiter}
                  style={styles.imgStyle}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  onPress={() => {
                    handleModalClose();
                    resetPlaceholder();
                  }}
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: -185,
                    marginRight: 15,
                  }}
                >
                  <AntDesign name="close" size={29} color="#485460" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <Text style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}>
              {i18n.t('help_us_improve')}
            </Text>
            <Text style={[styles.txtName, { fontFamily: 'ProximaNova' }]}>
              {i18n.t('will_contact_shortly')}
            </Text>
            <TextInput
              selectionColor={Colors.yellow}
              value={waiterName}
              onChangeText={text => {
                setwaiterName(text);
                // ScrollToEnd();
              }}
              placeholder={placeholderWaiterName}
              onFocus={() => {
                if (Platform.OS != 'ios') {
                  setPlaceholderWaiterName('');
                }
                // ScrollToEnd();
              }}
              onBlur={() => {
                if (!email && Platform.OS != 'ios') {
                  setPlaceholderWaiterName(i18n.t('name_of_your_server'));
                }
              }}
              style={[
                styles.inputStyle,
                { fontFamily: 'ProximaNova', textAlign: 'center' },
              ]}
            />
            <View style={{ flexDirection: 'row', position: 'relative' }}>
              <TextInput
                selectionColor={Colors.yellow}
                keyboardType="email-address"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  // ScrollToEnd();
                }}
                placeholder={placeholderEmail}
                onFocus={() => {
                  if (Platform.OS != 'ios') {
                    setPlaceholderEmail('');
                  }
                  // ScrollToEnd();
                }}
                onBlur={() => {
                  if (!email && Platform.OS != 'ios') {
                    setPlaceholderEmail(i18n.t('waiter_email'));
                  }
                }}
                style={[
                  styles.inputStyle,
                  { fontFamily: 'ProximaNova', textAlign: 'center' },
                ]}
              />
              <Text style={{ position: 'absolute', right: 3.5, top: 14 }}>
                {emailError && (
                  <FontAwesome5
                    name="exclamation-circle"
                    size={13}
                    color="red"
                  />
                )}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              disabled={ValidateDisable()}
              onPress={HandlePostData}
              style={[styles.btnConfrm, ValidateButtonColor()]}
            >
              {loading ? (
                <ActivityIndicator size={29} color="#EBC11B" />
              ) : (
                <Text
                  style={[styles.txtBtnConfrm, { fontFamily: 'ProximaNova' }]}
                >
                  {i18n.t('add')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </Overlay>
  );
};

export default ConfirmationModal;

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
    height: 220,
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '7%',
    height: 45,
  },
  txtName: {
    fontSize: 18,
    color: Colors.fontDark,
    marginTop: 15,
    marginBottom: 3,
    textAlign: 'center',
    maxWidth: '80%',
  },
  imgStyle: {
    width: 240,
    height: 200,
    alignSelf: 'center',
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  inputStyle: {
    height: 50,
    width: '80%',
    borderColor: '#e6e6e6',
    borderRadius: 9,
    borderWidth: 1.3,
    marginTop: 12,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
