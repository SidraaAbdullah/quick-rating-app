import React, { useState, useContext, useEffect } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../../components/common-button';
import GlobalHeader from '../../components/GlobalHeader';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import i18n from '../../li8n';
import { useQuery } from 'react-query';
import { RECRUITMENT_FORM, GET_YOUR_RES } from '../../queries';
import { reactQueryConfig } from '../../constants';
import Context from '../../contextApi/context';
import { ReviewsSkeleton } from '../../components/skeleton';
import StaffModal from '../../components/manager/staff-modal';
import { getAsyncStorageValues } from '../../constants';
import HomeScreenContent from '../../components/HomeContent';
import * as actionTypes from '../../contextApi/actionTypes';

const ServerProfile = ({ navigation, route }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [formId, setFormId] = useState('');
  const { state, dispatch } = useContext(Context);
  // const [saveLocation, setSaveLocation] = useState('');
  const [userInfo, setuserInfo] = useState();
  const {
    data: waiterFormData,
    isLoading: waiterFormLoading,
    refetch: refetchWaiterFormData,
  } = useQuery(
    ['RECRUITMENT_FORM', { user_id: state?.userDetails?.user_id }],
    RECRUITMENT_FORM,
    {
      ...reactQueryConfig,
      enabled: state?.userDetails?.user_id ? true : false,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  useEffect(() => {
    (async () => {
      // const { location } = await getAsyncStorageValues();
      const { userInfo = {} } = await getAsyncStorageValues();
      setuserInfo(userInfo);
      // setSaveLocation(location);
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
        // location: saveLocation,
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
          <View style={{ alignItems: 'center', marginTop: '5%' }}>
            <View style={{ width: '100%', flex: 1 }}>
              <HomeScreenContent
                route={route}
                restaurantLoading={yourRestaurantLoading}
                resIsFetching={yourResIsFetching}
                refetchRestaurant={yourRefetchRestaurant}
                isFetch={true}
                Data={yourRestaurantData?.restaurants?.results || []}
                // saveLocation={saveLocation}
              />
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 30,
                alignSelf: 'flex-start',
              }}
            >
              <View style={{ marginBottom: 25, marginHorizontal: '2%' }}>
                <CommonButton
                  title={i18n.t('ind_rest')}
                  navigation={'Home'}
                  navigationData={{ crossIcon: false }}
                  dispatch={() => {
                    dispatch({
                      type: actionTypes.REFRESH_ANIMATION,
                      payload: !state.refreshAnimation,
                    });
                  }}
                />
              </View>
              {waiterFormLoading ? (
                <View
                  style={{
                    width: '99%',
                    flexDirection: 'row',
                  }}
                >
                  <ReviewsSkeleton />
                </View>
              ) : (
                <>
                  {!waiterFormData?.data[0]?.position ? (
                    <View>
                      <View>
                        <Text style={styles.textBold}>
                          {i18n.t('are_you_job')}
                        </Text>
                        <Text
                          style={{ ...styles.textLight, marginHorizontal: 25 }}
                        >
                          {i18n.t('comp_job')}
                        </Text>
                      </View>
                      <View style={{ marginTop: 20 }}>
                        <CommonButton
                          title={i18n.t('look_job')}
                          navigation="FindJob"
                          navigationData={{
                            form: [],
                            refetch: refetchWaiterFormData,
                            onPress: '',
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        marginHorizontal: Platform.OS === 'ios' ? '3%' : '1.6%',
                      }}
                    >
                      <View>
                        <Text style={styles.boldTxt2}>
                          {i18n.t('your_cand_prof')}
                        </Text>
                        <Text style={styles.lighTxt2}>
                          {i18n.t('prev_rec')}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => {
                            setFormId(waiterFormData?.data[0]?._id);
                            setModalVisible(true);
                          }}
                          style={styles.main_card_container}
                        >
                          <View style={styles.section1}>
                            <View>
                              <Image
                                source={{
                                  uri:
                                    waiterFormData?.data[0]?.user_id?.picture,
                                }}
                                style={{
                                  borderRadius: 30,
                                  width: 57,
                                  height: 57,
                                }}
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: 'center',
                                paddingLeft: 10,
                              }}
                            >
                              <Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={styles.name_staff}
                              >
                                {waiterFormData?.data[0]?.user_id?.full_name}
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: Platform.OS === 'ios' ? 10 : 7,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'ProximaNovaBold',
                                    fontSize: Platform.OS === 'ios' ? 18 : 16,
                                  }}
                                >
                                  {waiterFormData?.data[0]?.position ||
                                    i18n.t('waiter')}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.section2}>
                            <AntDesign name="right" size={20} color="#485460" />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <CommonButton
                          navigation="FindJob"
                          navigationData={{
                            form: waiterFormData?.data[0] || [],
                            refetch: refetchWaiterFormData,
                          }}
                          title={i18n.t('modif_prof')}
                        />
                      </View>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>

          {isModalVisible && (
            <StaffModal
              formId={formId || ''}
              isModalVisible={isModalVisible}
              setModalVisible={setModalVisible}
              profile={true}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ServerProfile;
