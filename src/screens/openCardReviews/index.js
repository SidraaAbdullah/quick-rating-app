/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Animated,
  Linking,
  Alert,
} from 'react-native';
import RefferedWaiterModal from '../../components/modals/ConfirmModal';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import CommonModal from '../../components/modals/HelpUsImproveModal';
import { Colors } from '../../constants/Theme';
import { useMutation, useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';
import {
  GET_WAITERS,
  I_AM_WAITER,
  ADDING_WAITERS,
  GET_RESTAURANT_DETAILS,
  GET_REVIEWS,
} from '../../queries';
import Context from '../../contextApi/context';
const imgSitting = require('../../assets/images/sittingtable.png');
const waiter = require('../../assets/images/waiter2.png');
import i18n from '../../li8n';
import Spinner from 'react-native-loading-spinner-overlay';
import { styles, TopCard } from '../../components/restaurant-screen';
import { Staff, Review, HeaderImage } from '../../components/open-card-review';

const ReviewDetails = ({ navigation, route }) => {
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${RestaurantDetails?.data?.international_phone_number}`;
    } else {
      number = `tel:${RestaurantDetails?.data?.international_phone_number}`;
    }
    Linking.openURL(number);
  };

  const [data, setData] = useState([]);
  const [userWaiterModalVisible, setUserWaiterModalVisible] = useState(false);
  const [RefferedWaiterModalVisible, setRefferedWaiterModalVisible] = useState(
    false,
  );
  const [userThanksModalVisible, setUserThanksModalVisible] = useState(false);
  const [refferedThanksModalVisible, setRefferedThanksModalVisible] = useState(
    false,
  );
  const { state } = useContext(Context);
  const [IAMWAITER] = useMutation(I_AM_WAITER);
  const [AddWaiters] = useMutation(ADDING_WAITERS);
  const [Refferedloading, setRefferedLoading] = useState(false);
  const [Userloading, setUserLoading] = useState(false);
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 55);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });
  const {
    img,
    name,
    rating,
    distance,
    services,
    place_id,
    vicinity,
    our_rating,
    restaurant_id,
    geometry,
  } = route?.params;

  const {
    data: reviewData,
    isLoading: reviewDataLoading,
    refetch: reviewRefetch,
  } = useQuery(
    [
      'GET_REVIEWS',
      {
        google_place_id: place_id,
        user_id: state.userDetails.user_id,
      },
    ],
    GET_REVIEWS,
    {
      ...reactQueryConfig,
      enabled: place_id,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  const {
    data: waitersData,
    isLoading: waitersLoading,
    refetch: refetchWaiters,
    isFetching: waitersIsFetching,
  } = useQuery(
    ['GET_WAITERS', { restaurant_id: place_id, statuses: ['active'] }],
    GET_WAITERS,
    {
      ...reactQueryConfig,
      enabled: place_id,
      onSuccess: res => {
        setData(res.data);
      },
    },
  );
  const {
    data: RestaurantDetails,
    isLoading: RestaurantDetailsLoading,
    refetch: refetchRestaurantDetails,
    isFetching: RestaurantDetailsIsFetching,
  } = useQuery(
    ['GET_RESTAURANT_DETAILS', { _id: place_id }],
    GET_RESTAURANT_DETAILS,
    {
      ...reactQueryConfig,
    },
  );
  const handleRefferedModalClose = () => {
    setRefferedLoading(false);
    setRefferedWaiterModalVisible(false);
  };

  const handleRefferedModalOpen = () => {
    setRefferedWaiterModalVisible(true);
  };

  const handleUserModalClose = () => {
    setUserLoading(false);
    setUserWaiterModalVisible(false);
  };

  const handleUserModalOpen = () => {
    const isUserAlreadyWaiter = data.find(
      item => item?.user_id?._id === state.userDetails.user_id,
    );
    if (isUserAlreadyWaiter) {
      alert(i18n.t('already_waiter'));
    } else {
      setUserWaiterModalVisible(true);
    }
  };
  const restaurant = {
    place_id: place_id,
    rating: rating,
    photos: [img],
    name: name,
    formatted_address: vicinity,
    our_rating: String(our_rating),
    location: geometry,
    international_phone_number:
      RestaurantDetails?.data?.international_phone_number,
  };
  const handleAddWaiter = async (fullName, email) => {
    if (state.userDetails.user_id) {
      setRefferedLoading(true);
      let newWaiter = {
        created_by: state.userDetails.user_id,
        full_name: fullName,
        restaurant,
        email: email,
      };
      // updateRestaurants_AddWaiter(state, place_id);
      await AddWaiters(newWaiter, {
        onSuccess: () => {
          // await refetchWaiters();
          handleRefferedModalClose();
          setRefferedLoading(false);
          setRefferedThanksModalVisible(true);
        },
        onError: e => {
          handleRefferedModalClose();
          setRefferedLoading(false);
          alert(e);
        },
      });
    } else {
      handleRefferedModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };

  const handleIAMWAITER = async () => {
    if (state.userDetails.user_id) {
      setUserLoading(true);
      let IWaiter = {
        user_id: state.userDetails.user_id,
        restaurant,
        // company_name: companyName,
        // business_registration_number: businessRegNumber,
        // manager_name: bossName,
        // manager_contact: bossContact,
      };
      // updateRestaurants(state, place_id);
      await IAMWAITER(IWaiter, {
        onSuccess: async res => {
          // const restaurant = state.restaurantsDetails.find(
          //   res => res.place_id === place_id,
          // );
          // dispatch({
          //   type: actionTypes.YOUR_RESTAURANTS,
          //   payload: [
          //     ...state.yourRestaurants,
          //     { ...res.data.data, distance, servers: restaurant.servers + 1 },
          //   ],
          // });
          // await refetchWaiters();
          handleUserModalClose();
          setUserLoading(false);
          setUserThanksModalVisible(true);
        },
        onError: e => {
          setUserLoading(false);
          Alert.alert(
            'Error',
            e.response?.data?.message,
            [
              {
                text: 'Cancel',
                onPress: () => handleUserModalClose(),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => handleUserModalClose() },
            ],
            { cancelable: false },
          );
          // alert('You are already waiter in this restaurant.');
        },
      });
    } else {
      handleUserModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={
          waitersIsFetching &&
          !Refferedloading &&
          !Userloading &&
          !waitersLoading
        }
      />
      <HeaderImage
        translateY={translateY}
        navigation={navigation}
        route={route}
      />

      <ScrollView
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{ marginTop: 220, marginHorizontal: 24, marginBottom: 20 }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('MapScreen', {
                geometry,
                name,
              })
            }
            style={[
              styles.viewItem,
              {
                borderBottomColor: '#f9f9f9',
                borderBottomWidth: 1,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
            ]}
          >
            <View style={styles.viewIcon}>
              <Feather name="send" size={18} color={Colors.yellow} />
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 14,
                width: '70%',
                lineHeight: 17,
              }}
            >
              {vicinity || name}
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              RestaurantDetails?.data?.international_phone_number &&
              openDialScreen()
            }
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
              {RestaurantDetailsLoading
                ? i18n.t('please_wait')
                : RestaurantDetails?.data?.international_phone_number ||
                  i18n.t('none')}
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
        </View>
        {!reviewDataLoading && (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <Review
              route={route}
              navigation={navigation}
              restaurant={restaurant}
              img={img}
              name={name}
              rating={rating}
              reviewData={reviewData}
              reviewRefetch={reviewRefetch}
            />
            <Staff
              handleRefferedModalOpen={handleRefferedModalOpen}
              route={route}
              waitersLoading={waitersLoading}
              waitersIsFetching={waitersIsFetching}
              data={data}
              navigation={navigation}
            />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.5}
        disabled={RestaurantDetails?.data?.menu_url ? false : true}
        onPress={() => {
          if (RestaurantDetails?.data?.menu_url) {
            WebBrowser.openBrowserAsync(RestaurantDetails?.data?.menu_url);
          }
        }}
        style={[
          styles.viewLastBtn,
          { marginBottom: 10 },
          !RestaurantDetails?.data?.menu_url && {
            backgroundColor: '#f0f0f0',
          },
        ]}
      >
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 16,
            color: Colors.fontDark,
          }}
        >
          {i18n.t('see_the_menu')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleUserModalOpen}
        style={styles.viewLastBtn}
      >
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 16,
            color: Colors.fontDark,
          }}
        >
          {i18n.t('are_you_waiter')}
        </Text>
      </TouchableOpacity>

      {RefferedWaiterModalVisible && (
        <RefferedWaiterModal
          isVisible={RefferedWaiterModalVisible}
          handleModalClose={handleRefferedModalClose}
          loading={Refferedloading}
          postData={handleAddWaiter}
        />
      )}
      {refferedThanksModalVisible && (
        <CommonModal
          isVisible={refferedThanksModalVisible}
          handleModalClose={() => setRefferedThanksModalVisible(false)}
          image={imgSitting}
          onPress={() => setRefferedThanksModalVisible(false)}
          heading={i18n.t('thank_collaboration')}
          subHeadingText={i18n.t('waiter_our_database')}
          buttonText={i18n.t('close')}
        />
      )}
      {userWaiterModalVisible && (
        <CommonModal
          isVisible={userWaiterModalVisible}
          handleModalClose={handleUserModalClose}
          loading={Userloading}
          onPress={handleIAMWAITER}
          image={waiter}
          buttonText={i18n.t('i_confirm')}
          subHeadingText={i18n.t('confrm_you_are_server')}
          restaurant={name}
        />
      )}
      {userThanksModalVisible && (
        <CommonModal
          isVisible={userThanksModalVisible}
          handleModalClose={() => setUserThanksModalVisible(false)}
          image={waiter}
          onPress={() => setUserThanksModalVisible(false)}
          subHeadingText={i18n.t('check_profile')}
          buttonText={i18n.t('Thank_you')}
        />
      )}
    </View>
  );
};
export default ReviewDetails;
