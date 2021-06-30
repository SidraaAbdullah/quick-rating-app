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

const HomeScreen = props => {
  const [searchVal, setSearchVal] = useState('');
  const [searchEnter, setsearchEnter] = useState('');
  const [saveLocation, setSaveLocation] = useState('');
  // const [nextPageToken, setnextPageToken] = useState();
  const { state, dispatch } = useContext(Context);
  const { restaurantsDetails: data } = state;

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
