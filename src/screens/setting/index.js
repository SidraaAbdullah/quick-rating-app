import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GlobalHeader from '../../components/GlobalHeader';
import { Colors } from '../../constants/Theme';
import * as ImagePicker from 'expo-image-picker';
import { getAsyncStorageValues } from '../../constants';
import * as Google from 'expo-google-app-auth';
import { config } from '../../constants';
import i18n from '../../li8n';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
import { UPDATE_PICTURE } from '../../queries';
import { useMutation } from 'react-query';
import { Platform } from 'react-native';
// import * as StoreReview from 'expo-store-review';
import { email_to } from '../../constants/env';
import Constants from 'expo-constants';
import { userGivenName } from '../../util';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
const imgBg = require('../../assets/images/Group5.png');
import CommonButton from '../../components/common-button';

const Setting = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [image, setImage] = useState();
  const [updatePicture] = useMutation(UPDATE_PICTURE);

  const resetState = async () => {
    navigation.navigate('Home', { crossIcon: false });
    dispatch({
      type: actionTypes.USER_DETAILS,
      payload: {},
    });
    await AsyncStorage.setItem('@userInfo', JSON.stringify({}));
    await AsyncStorage.setItem('@manager_details', JSON.stringify({}));
    setLoading(false);
  };

  //user signout
  const handleSignOut = async () => {
    const { userInfo } = await getAsyncStorageValues();
    const accessToken = userInfo.accessToken;
    /* Log-Out */
    if (accessToken) {
      setLoading(true);
      try {
        const auth = await Facebook.getAuthenticationCredentialAsync();
        if (auth) {
          Facebook.logOutAsync();
          resetState();
        } else {
          await Google.logOutAsync({ accessToken, ...config });
          resetState();
        }
      } catch {
        resetState();
      }
    }
  };

  const handleChangePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);

      const { userInfo } = await getAsyncStorageValues();
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: {
          ...state.userDetails,
          image: result.uri,
        },
      });

      await AsyncStorage.setItem(
        '@userInfo',
        JSON.stringify({
          ...userInfo,
          image: result.uri,
        }),
      );

      let formData = new FormData();
      formData.append('image', {
        uri: result.uri,
        type: `image/${result.uri.split('.')[1]}`,
        name: result.uri.substr(result.uri.lastIndexOf('/') + 1),
      });

      let UploadData = {
        user_id: state.userDetails.user_id,
        image: formData,
      };

      await updatePicture(UploadData, {
        onSuccess: res => {},
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.viewProfile}>
        <ImageBackground
          style={{
            width: '100%',
            height: Dimensions.get('window').height * 0.43,
          }}
          source={imgBg}
          resizeMode="stretch"
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('setting')}
            fontSize={17}
            color={'black'}
            Home={true}
            backgroundColor={'transparent'}
            navigation={navigation}
            logout={handleSignOut}
          />
          <View style={styles.viewImg}>
            {!state?.userDetails?.image ? (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 60,
                }}
                source={{
                  uri:
                    'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png',
                }}
              />
            ) : (
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 60,
                }}
                source={{ uri: image ? image : state?.userDetails?.image }}
                resizeMode="cover"
              />
            )}
          </View>
          <TouchableOpacity
            onPress={handleChangePicture}
            style={styles.btnPencil}
          >
            <View style={styles.viewPencil}>
              <MaterialCommunityIcons
                name="pencil-outline"
                color="#fff"
                size={15}
              />
            </View>
          </TouchableOpacity>
          <Text style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}>
            {!state?.userDetails?.name
              ? 'Bonjour'
              : userGivenName(state.userDetails.name)}
          </Text>
        </ImageBackground>
      </View>

      <View
        style={{
          width: '90%',
          marginTop: 30,
        }}
      >
        <CommonButton
          title={i18n.t('i_waiter')}
          navigation={'WaiterProfile'}
          navigationData={{ crossIcon: true }}
        />
      </View>

      <View style={{ width: '90%', marginTop: 10 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            ...styles.viewItem,
            borderRadius: 8,
          }}
          onPress={() => {
            Linking.openURL(`mailto:${email_to}`);
          }}
        >
          <View style={styles.viewIcon}>
            <FontAwesome name="envelope" size={16} color={Colors.yellow} />
          </View>
          <Text
            style={{
              fontFamily: 'ProximaNova',
              color: Colors.fontDark,
              fontSize: 16,
            }}
          >
            {i18n.t('contact_us')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ position: 'absolute', bottom: 20 }}>
        <Text style={[styles.versionText, { fontFamily: 'ProximaNova' }]}>
          Version {Constants.manifest.version}
        </Text>
      </View>
    </View>
  );
};
export default Setting;

const styles = StyleSheet.create({
  logoutBtn: {
    position: 'absolute',
    top: 42,
    right: 20,
    zIndex: 9999,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEF0EF',
  },
  versionText: {
    marginTop: 20,
    color: Colors.fontLight,
    fontSize: 12,
  },
  viewPencil: {
    width: 25,
    height: 25,
    backgroundColor: '#1E272E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPencil: {
    backgroundColor: '#FCDF6F',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: -70,
    marginTop: -30,
  },
  viewIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#FFF6D4',
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon2: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnConatiner: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: -65,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  viewItem: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  btnValider: {
    backgroundColor: Colors.yellow,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 3,
    // position: 'absolute',
    // bottom: 10,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
  txtName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    color: Colors.fontDark,
  },
  viewImg: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  viewProfile: {
    backgroundColor: Colors.yellow,
    width: '100%',
    height: Dimensions.get('window').height * 0.43,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
