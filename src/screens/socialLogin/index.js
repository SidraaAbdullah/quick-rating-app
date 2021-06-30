import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme';
import * as Google from 'expo-google-app-auth';
import i18n from '../../li8n';
import { config } from '../../constants';
import { userSignUp, iPhoneLoginName } from '../../util';
import { useMutation } from 'react-query';
import { GOOGLE_SIGNUP, SEND_PUSH_TOKEN } from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
const logo = require('../../assets/images/logo-without.png');
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Device from 'expo-device';
import { getAsyncStorageValues } from '../../constants';
import * as Notifications from 'expo-notifications';
import * as Localization from 'expo-localization';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const SocialLogin = ({ navigation, route }) => {
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const [googleSignup] = useMutation(GOOGLE_SIGNUP);
  const [vote, setVote] = useState(false);
  const [confirmWaiter, setconfirmWaiter] = useState(false);
  const [HelpUs, setHelpUs] = useState();
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const { state, dispatch } = useContext(Context);
  const notificationListener = useRef();
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const registerForPushNotifications = async user_id => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
      });
    }
    const { locale } = await Localization.getLocalizationAsync();
    await sendNotificationToken(
      {
        id: user_id,
        expo_notification_token: token,
        lang: locale || '',
      },
      {
        enabled: user_id ? true : false,
      },
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        navigation.navigate('WaiterProfile', {
          crossIcon: true,
        });
      },
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        navigation.navigate('WaiterProfile', {
          crossIcon: true,
        });
      },
    );
  };

  useEffect(() => {
    setVote(route?.params?.vote ? route?.params?.vote : false);
    setconfirmWaiter(
      route?.params?.confirmWaiter ? route?.params?.confirmWaiter : false,
    );
    setHelpUs(route?.params?.HelpUs ? route?.params?.HelpUs : false);
  }, [route.params]);

  useEffect(() => {
    async function loadCity() {
      const { City } = await getAsyncStorageValues();
      setCity(City?.city);
    }
    loadCity();
  }, []);
  const os = Platform.OS === 'android' ? 'android' : 'apple';
  const handleGoogleSignIn = async () => {
    setLoading(true);
    // First- obtain access token from Expo's Google API
    const { type, accessToken, user } = await Google.logInAsync(config);
    if (type === 'success') {
      setLoading(true);
      // Then you can use the Google REST API
      let userInfoResponse = await userSignUp(accessToken);
      let userSignInDetails = {
        ...userInfoResponse.data,
        city: city,
        login_type: 'Google',
        mobile_type: Device.deviceName,
        verified_email: `${userInfoResponse.data.verified_email}`,
        os,
      };
      await googleSignup(userSignInDetails, {
        onSuccess: async res => {
          if (vote) {
            navigation.navigate('RateYourService');
            setVote(false);
          } else if (confirmWaiter || HelpUs) {
            navigation.navigate('OpenCardReviews');
          } else {
            // navigation.navigate('Home', { crossIcon: false });
            navigation.replace('WaiterProfile', { crossIcon: true });
          }
          let userDetails = {
            name: res?.user?.full_name,
            // ? userGivenName(res?.user?.full_name)
            // : '',
            image: res?.user?.picture || '',
            email: res?.user?.email || '',
            accessToken: accessToken || '',
            user_id: res?.user?._id || '',
            os,
          };
          dispatch({
            type: actionTypes.USER_DETAILS,
            payload: userDetails,
          });
          await AsyncStorage.setItem(
            '@userInfo',
            JSON.stringify({
              ...userDetails,
            }),
          );
          registerForPushNotifications(res?.user?._id);
          setLoading(false);
        },
        onError: error => {
          setLoading(false);
          alert(`Google Login Error: ${error}`);
        },
      }).catch(error => {
        setLoading(false);
        alert(`Google Login Error: ${error}`);
      });
    } else {
      setLoading(false);
    }
  };

  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '771555200360518',
      });
      if (Platform.OS === 'ios') {
        await Facebook.setAdvertiserTrackingEnabledAsync(true);
      }
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,first_name,last_name,middle_name,email,picture.height(500)`,
        )
          .then(response => response.json())
          .then(async data => {
            setLoading(true);

            let user = {
              name: data?.name || '',
              email: data?.email || '',
              family_name: data?.last_name || '',
              id: data?.id || '',
              picture: data?.picture?.data?.url || '',
              city: city,
              login_type: 'Facebook',
              mobile_type: Device.deviceName || '',
              os,
            };
            await googleSignup(user, {
              onSuccess: async res => {
                if (vote) {
                  navigation.navigate('RateYourService');
                  setVote(false);
                } else if (confirmWaiter || HelpUs) {
                  navigation.navigate('OpenCardReviews');
                } else {
                  // navigation.navigate('Home', { crossIcon: false });
                  navigation.replace('WaiterProfile', { crossIcon: true });
                }
                let userDetails = {
                  name: res?.user?.full_name,
                  // ? userGivenName(res?.user?.full_name)
                  // : '',
                  image: res?.user?.picture || '',
                  email: res?.user?.email || '',
                  accessToken: token || '',
                  user_id: res?.user?._id || '',
                };

                dispatch({
                  type: actionTypes.USER_DETAILS,
                  payload: userDetails,
                });

                await AsyncStorage.setItem(
                  '@userInfo',
                  JSON.stringify({
                    ...userDetails,
                  }),
                );
                registerForPushNotifications(res?.user?._id);
                setLoading(false);
              },
              onError: e => {
                setLoading(false);
                alert(`Facebook Login Error: ${e}`);
              },
            });
          })
          .catch(e => {
            setLoading(false);
            alert(`Facebook Login Error: ${e}`);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <>
      <LinearGradient
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        colors={[Colors.yellow, 'transparent']}
      />
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        contentContainerStyle={[
          styles.container,
        ]}
      >

        {loading ? (
          <ActivityIndicator size={70} color={Colors.yellow} />
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <LottieView
              autoPlay
              speed={0.7}
              style={{ width: 250 }}
              source={require('../../assets/lottie/splash.json')}
              loop={true}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -60,
              }}
            >
              <Image
                style={styles.imgLogoStyle}
                source={logo}
                resizeMode="contain"
              />
            </View>
            {/* <TouchableOpacity
            activeOpacity={0.5}
            onPress={facebookLogin}
            style={styles.btnFb}
          >
            <FontAwesome name="facebook" color="#fff" size={20} />
            <Text
              style={[
                styles.textFb,
                {
                  fontSize: 16,
                  fontFamily: 'ProximaNova',
                },
              ]}
            >
              {i18n.t('continue_with_fb')}
            </Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleGoogleSignIn}
              style={styles.btnGoogle}
            >
              <FontAwesome name="google" color="#fff" size={20} />
              <Text
                style={[
                  styles.textFb,
                  {
                    fontSize: 16,
                    fontFamily: 'ProximaNova',
                  },
                ]}
              >
                {i18n.t('continue_with_google')}
              </Text>
            </TouchableOpacity>
            {Platform.OS === 'ios' && (
              <React.Fragment>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={async () => {
                    try {
                      const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                          AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                      });

                      let user = {
                        name: iPhoneLoginName(credential.fullName) || '',
                        email: credential.email || '',
                        family_name: credential.fullName?.familyName || '',
                        id: credential.user || '',
                        picture: credential.image || '',
                        city: city,
                        login_type: 'Facebook',
                        mobile_type: Device.deviceName || '',
                        os,
                      };

                      await googleSignup(user, {
                        onSuccess: async res => {
                          if (vote) {
                            navigation.navigate('RateYourService');
                            setVote(false);
                          } else if (confirmWaiter || HelpUs) {
                            navigation.navigate('OpenCardReviews');
                          } else {
                            // navigation.navigate('Home', { crossIcon: false });
                            navigation.replace('WaiterProfile', { crossIcon: true });
                          }
                          let userDetails = {
                            name: res?.user?.full_name,
                            // ? userGivenName(res?.user?.full_name)
                            // : '',
                            image: res?.user?.picture || '',
                            email: res?.user?.email || '',
                            accessToken: credential.authorizationCode || '',
                            user_id: res?.user?._id || '',
                          };

                          dispatch({
                            type: actionTypes.USER_DETAILS,
                            payload: userDetails,
                          });

                          await AsyncStorage.setItem(
                            '@userInfo',
                            JSON.stringify({
                              ...userDetails,
                            }),
                          );
                          registerForPushNotifications(res?.user?._id);
                          setLoading(false);
                        },
                        onError: e => {
                          setLoading(false);
                          alert(`Apple Login Error: ${e}`);
                        },
                      });
                      // signed in
                    } catch (e) {
                      if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                      } else {
                        // handle other errors
                      }
                    }
                  }}
                  style={styles.btnApple}
                >
                  <FontAwesome name="apple" color="#fff" size={20} />
                  <Text
                    style={[
                      styles.textFb,
                      {
                        fontSize: 16,
                        fontFamily: 'ProximaNova',
                      },
                    ]}
                  >
                    {i18n.t('continue_with_apple')}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};
export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
  },
  txtCreatingAcc: {
    color: Colors.fontLight,
    fontSize: 12,
    marginLeft: 4,
    marginTop: 25,
  },
  viewImg: {
    width: '100%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 10,
  },
  viewbtns: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    marginLeft: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.38,
    alignSelf: 'center',
    marginTop: 15,
  },
  imgLogoStyle: {
    width: 300,
  },
  btnFb: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 15,
    marginTop: -35,
  },
  btnGoogle: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#DD4B39',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 15,
  },
  btnApple: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 15,
  },
  textFb: {
    color: '#fff',
    marginLeft: 10,
  },
  cross: {
    width: '18%',
    alignSelf: 'flex-start',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
});
