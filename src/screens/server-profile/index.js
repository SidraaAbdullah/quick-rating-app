import React, { useState, useContext, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../../components/common-button';
import GlobalHeader from '../../components/GlobalHeader';
import styles from './styles';
import i18n from '../../li8n';
import { useQuery } from 'react-query';
import { GET_YOUR_RES } from '../../queries';
import { reactQueryConfig } from '../../constants';
import Context from '../../contextApi/context';
import { getAsyncStorageValues } from '../../constants';
import HomeScreenContent from '../../components/HomeContent';
import * as actionTypes from '../../contextApi/actionTypes';

const ServerProfile = ({ navigation, route }) => {
  const { state, dispatch } = useContext(Context);
  const [userInfo, setuserInfo] = useState();

  useEffect(() => {
    (async () => {
      const { userInfo = {} } = await getAsyncStorageValues();
      setuserInfo(userInfo);
    })();
  }, []);

  const {
    data: yourRestaurantData,
    isLoading: yourRestaurantLoading,
    refetch: yourRefetchRestaurant,
    isFetching: yourResIsFetching,
  } = useQuery(
    [
      'GET_YOUR_RES',
      {
        user_id: userInfo?.user_id,
      },
    ],
    GET_YOUR_RES,
    {
      ...reactQueryConfig,
      enabled: userInfo?.user_id ? true : false,
    },
  );

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
            headingText={i18n.t('profile_server')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
            Home={true}
          />
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={{marginTop: '5%' }}>
            <HomeScreenContent
              route={route}
              restaurantLoading={yourRestaurantLoading}
              resIsFetching={yourResIsFetching}
              refetchRestaurant={yourRefetchRestaurant}
              isFetch={true}
              Data={yourRestaurantData?.restaurants?.results || []}
              saveLocation
            />
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 40 }}>
              <CommonButton
                title={i18n.t('ind_rest')}
                navigation={'Home'}
                navigationData={{ crossIcon: false }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ServerProfile;
