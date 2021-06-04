import React, { useEffect, useContext, useRef } from 'react';
import { Animated, ActivityIndicator, Platform } from 'react-native';
// import { CommonActions } from '@react-navigation/native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';
import { Colors } from '../../constants/Theme';
import * as actionTypes from '../../contextApi/actionTypes';
var getCountry = require('country-currency-map').getCountry;
var formatCurrency = require('country-currency-map').formatCurrency;
import { loadAsync } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
// import * as Device from 'expo-device';

import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SplashScreen(props) {
  const { dispatch } = useContext(Context);
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
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
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      const { userInfo = {} } = await getAsyncStorageValues();
      const { locale } = await Localization.getLocalizationAsync();
      if (userInfo?.user_id) {
        await sendNotificationToken({
          id: userInfo?.user_id || '',
          expo_notification_token: token || '',
          lang: locale || '',
        });
        notificationListener.current = Notifications.addNotificationReceivedListener(
          notification => {
            props.navigation.navigate('WaiterProfile', {
              crossIcon: true,
            });
          },
        );
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
          response => {
            props.navigation.navigate('WaiterProfile', {
              crossIcon: true,
            });
          },
        );
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      const { userInfo = {} } = await getAsyncStorageValues();
      let userDetails = {
        name: userInfo?.name,
        image: userInfo?.image,
        email: userInfo?.email,
        accessToken: userInfo?.accessToken,
        user_id: userInfo?.user_id,
      };
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: userDetails,
      });
      async function loadFont() {
        await loadAsync({
          // Load a font `Montserrat` from a static resource
          ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
          ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
          ProximaNovaSemiBold: require('../../assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
        });
      }
      loadFont();
    })();
  }, []);

  const [springValue] = React.useState(new Animated.Value(0.5));
  const locationFunction = async () => {
    const { userInfo = {} } = await getAsyncStorageValues();
    try {
      if (Platform.OS === 'ios') {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          console.log('Yay! I have user permission to track data');
        }
      }
      let values = await Location.requestForegroundPermissionsAsync();
      if (values === 'granted') {
        // props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'NoLocation' }],
        //   }),
        // );
        props.navigation.replace('Home', { crossIcon: false });
      }

      const isLocation = await Location.hasServicesEnabledAsync();
      if (isLocation) {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        NetInfo.fetch().then(state => {
          if (state.isConnected && userInfo?.user_id) {
            props.navigation.replace('Home', { crossIcon: false });
          } else if (state.isConnected && !userInfo?.user_id) {
            props.navigation.navigate('socialLogin');
          } else {
            props.navigation.replace('NoWiFi');
          }
        });

        await AsyncStorage.setItem(
          '@location',
          JSON.stringify({
            lat: location?.coords.latitude,
            log: location?.coords.longitude,
          }),
        );

        Location.getCurrentPositionAsync().then(pos => {
          Location.reverseGeocodeAsync({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }).then(async res => {
            let currency = getCountry(res[0]?.country);
            let formattedCurrency = formatCurrency('', currency?.currency);
            await AsyncStorage.setItem(
              '@Currency',
              JSON.stringify({
                currency: formattedCurrency || '',
              }),
            );
            await AsyncStorage.setItem(
              '@City',
              JSON.stringify({
                city: res[0]?.city || '',
              }),
            );
          });
        });
      } else {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        NetInfo.fetch().then(state => {
          if (state.isConnected && userInfo?.user_id) {
            props.navigation.replace('Home', { crossIcon: false });
          } else if (state.isConnected && !userInfo?.user_id) {
            props.navigation.navigate('socialLogin');
          } else {
            props.navigation.replace('NoWiFi');
          }
        });

        await AsyncStorage.setItem(
          '@location',
          JSON.stringify({
            lat: location?.coords.latitude,
            log: location?.coords.longitude,
          }),
        );

        Location.getCurrentPositionAsync().then(pos => {
          Location.reverseGeocodeAsync({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }).then(async res => {
            let currency = getCountry(res[0]?.country);
            let formattedCurrency = formatCurrency('', currency?.currency);
            await AsyncStorage.setItem(
              '@Currency',
              JSON.stringify({
                currency: formattedCurrency || '',
              }),
            );
            await AsyncStorage.setItem(
              '@City',
              JSON.stringify({
                city: res[0]?.city || '',
              }),
            );
          });
        });
      }
    } catch (error) {
      // props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'NoLocation' }],
      //   }),
      // );
      props.navigation.replace('Home', { crossIcon: false });
    }
  };
  React.useEffect(() => {
    locationFunction();
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }, []);

  return (
    <ActivityIndicator style={{ flex: 1 }} size={70} color={Colors.yellow} />
  );
}
