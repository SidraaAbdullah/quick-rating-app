import React, { useState, useEffect, useContext } from 'react';
import Header from './HeaderAnimated';
import HomeScreenContent from '../../components/HomeContent';
import { StatusBar } from 'expo-status-bar';
import { getAsyncStorageValues } from '../../constants';
import { GET_RESTAURANT } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import { isSearch } from '../../util';
// import * as FacebookAds from 'expo-ads-facebook';

const HomeScreen = props => {
  const [searchVal, setSearchVal] = useState('');
  const [searchEnter, setsearchEnter] = useState('');
  const [saveLocation, setSaveLocation] = useState('');
  // const [nextPageToken, setnextPageToken] = useState();
  const { state, dispatch } = useContext(Context);
  const { restaurantsDetails: data } = state;

  // FacebookAds.AdSettings.addTestDevice(
  //   FacebookAds.AdSettings.currentDeviceHash,
  // );
  // FacebookAds.AdSettings.setAdvertisingTrackingEnabled(true);
  // const VALID_ANDROID_PLACEMENT_ID = 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID';
  // useEffect(() => {
  //   FacebookAds.InterstitialAdManager.showAd(VALID_ANDROID_PLACEMENT_ID)
  //     .then(didClick => {
  //     })
  //     .catch(error => {
  //       // call other ads
  //     });
  // }, []);

  useEffect(() => {
    (async () => {
      const { location } = await getAsyncStorageValues();
      setSaveLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!searchVal) {
      setsearchEnter('');
    }
  }, [searchVal]);

  // useQuery(
  //   [
  //     'GET_YOUR_RES',
  //     {
  //       location: saveLocation,
  //       user_id: userDetails.user_id,
  //       // pageToken: nextPageToken,
  //       // max_results: 1,
  //       // page_no: 1,
  //     },
  //   ],
  //   GET_YOUR_RES,
  //   {
  //     ...reactQueryConfig,
  //     enabled: saveLocation && userDetails.user_id,
  //     onSuccess: res => {
  //       dispatch({
  //         type: actionTypes.YOUR_RESTAURANTS,
  //         payload: res?.restaurants?.results || [],
  //       });
  //     },
  //   },
  // );

  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    refetch: refetchRestaurant,
    isFetching: resIsFetching,
  } = useQuery(
    [
      'GET_RESTAURANT',
      {
        location: saveLocation,
        search: isSearch(searchVal, searchEnter),
        // pageToken: nextPageToken,
      },
    ],
    GET_RESTAURANT,
    {
      ...reactQueryConfig,
      enabled: saveLocation,
      onSuccess: res => {
        dispatch({
          type: actionTypes.RESTAURANTS_DETAILS,
          payload: res?.restaurants?.results || [],
        });
      },
    },
  );

  // const handleLoadMore = () => {
  //   setnextPageToken(restaurantData.restaurants.next_page_token);
  //   // console.log('next page load');
  // };

  return (
    <>
      <Header
        searchVal={searchVal}
        restaurantLoading={restaurantLoading}
        setSearchVal={setSearchVal}
        navigation={props?.navigation}
        resIsFetching={resIsFetching}
        saveLocation={saveLocation}
        refetchRestaurant={refetchRestaurant}
        setsearchEnter={setsearchEnter}
        // nextPageToken={nextPageToken}
        Data={data}
      >
        <StatusBar translucent={true} style="dark" />
        <HomeScreenContent
          restaurantLoading={restaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={refetchRestaurant}
          resIsFetching={resIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          Data={data}
          route={props?.route}
        />
      </Header>
    </>
  );
};
export default HomeScreen;
