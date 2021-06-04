import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StaffCard from '../../components/manager/staff-card';
import StaffModal from '../../components/manager/staff-modal';
import FilterModal from '../../components/manager/filter-modal';
import i18n from '../../li8n';
import { useQuery } from 'react-query';
import { RECRUITMENT_FORM, DELETE_WAITER_FORMS } from '../../queries';
import { reactQueryConfig, getAsyncStorageValues } from '../../constants';
import { ReviewsSkeleton } from '../../components/skeleton';
import { filterSearch } from '../../util';
import { useMutation } from 'react-query';
import Spinner from 'react-native-loading-spinner-overlay';
import GlobalHeader from '../../components/GlobalHeader';

const ManagerStaff = ({ navigation }) => {
  const [deleteWaiterForm] = useMutation(DELETE_WAITER_FORMS);
  const [value, setValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [formId, setFormId] = useState('');

  //Filter States
  const [avail, setAvail] = useState('');
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(15);
  const [rating, setRating] = useState('');
  const [position, setPosition] = useState('');
  const [queries, setQueries] = useState(filterSearch());
  const [showCross, setShowCross] = useState(false);
  const [managerId, setManagerId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { manager_details } = await getAsyncStorageValues();
      setManagerId(manager_details?.data?._id);
    })();
  }, []);

  const {
    data: waitersFormData,
    isLoading: waitersFormLoading,
    refetch: refetchFormWaiters,
    isFetching: waitersFormIsFetching,
  } = useQuery(
    ['RECRUITMENT_FORM', { ...queries, manager_id: managerId }],
    RECRUITMENT_FORM,
    {
      ...reactQueryConfig,
      enabled: managerId ? true : false,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  const handleDeleteForm = async id => {
    setLoading(true);
    try {
      await deleteWaiterForm(
        {
          form_id: id,
        },
        {
          onSuccess: async () => {
            await refetchFormWaiters();
            setLoading(false);
          },
          onError: e => {
            alert(e?.response?.data?.message);
            setLoading(false);
          },
        },
      );
    } catch {
      setLoading(false);
    }
  };

  let FilterStates = {
    avail,
    low,
    high,
    rating,
    position,
    refetchFormWaiters,
  };

  const toggleModal = id => {
    setFormId(id);
    setModalVisible(!isModalVisible);
  };
  const toggleFilter = () => {
    setFilterModal(!filterModal);
  };
  const filterOnPress = (
    availability,
    expLow,
    expHigh,
    searchRating,
    searchPosition,
  ) => {
    setQueries(
      filterSearch(
        searchRating,
        expHigh,
        expLow,
        availability,
        searchPosition,
        value,
      ),
    );
    setAvail(availability);
    setLow(expLow);
    setHigh(expHigh);
    setRating(searchRating);
    setPosition(searchPosition);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
      <Spinner visible={loading} />
      <View
        style={{
          width: '100%',
          height: 100,
          zIndex: 9999,
        }}
      >
        <GlobalHeader
          arrow={true}
          fontSize={17}
          color={'black'}
          navigation={navigation}
          setting={true}
          backgroundColor={'transparent'}
          borderRadius={true}
        />
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={styles.first_section}>
          <View style={styles.child_one}>
            <Text style={styles.first_section_bold}>
              {i18n.t('recruit_estab')}
            </Text>
          </View>
          <View style={styles.child_two}>
            <View style={styles.yellow_box}>
              <Text style={styles.numbers_staff}>
                {waitersFormData?.data?.length || '0'}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.second_section}>
          <View style={styles.main}>
            <View style={styles.searchBar}>
              <View style={{ justifyContent: 'center', paddingRight: 20 }}>
                <Feather name="search" size={24} color="#FCDF6F" />
              </View>
              <View style={{ width: '78%', flexDirection: 'row' }}>
                <TextInput
                  placeholder={i18n.t('search')}
                  value={value}
                  placeholderTextColor="#707070"
                  onFocus={() => setShowCross(true)}
                  onBlur={() => setShowCross(false)}
                  onChangeText={e => {
                    setValue(e);
                    setQueries(
                      filterSearch(rating, high, low, avail, position, e),
                    );
                    e.length ? setShowCross(true) : setShowCross(false);
                  }}
                  style={{
                    width: '100%',
                    height: 40,
                    fontSize: 16,
                    fontFamily: 'ProximaNova',
                  }}
                />

                {showCross ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      marginLeft: -18,
                      zIndex: 9999,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => [
                        setValue(''),
                        setQueries(
                          filterSearch(rating, high, low, avail, position, ''),
                        ),
                        setShowCross(false),
                      ]}
                      activeOpacity={0.1}
                    >
                      <Image
                        source={require('../../assets/images/cross.png')}
                        style={{ width: 19, height: 19, marginRight: 80 }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={styles.filter}>
              <TouchableOpacity
                onPress={() => {
                  toggleFilter();
                }}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../../assets/images/Filter.png')}
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {waitersFormLoading ? (
        <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
          <ReviewsSkeleton />
          <ReviewsSkeleton />
        </View>
      ) : (
        <>
          {waitersFormData?.data?.length ? (
            <FlatList
              style={{ paddingHorizontal: 7, marginTop: 25 }}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={!loading && waitersFormIsFetching}
                  // color="#F9F9F9"
                  // tintColor="#F9F9F9"
                  onRefresh={refetchFormWaiters}
                />
              }
              data={waitersFormData?.data || []}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={itemData => (
                <StaffCard
                  data={itemData?.item}
                  toggleModal={toggleModal}
                  isModalVisible={isModalVisible}
                  setModalVisible={setModalVisible}
                  handleDeleteForm={handleDeleteForm}
                />
              )}
            />
          ) : (
            <Text
              style={{
                fontFamily: 'ProximaNovaSemiBold',
                fontSize: 16,
                paddingHorizontal: 25,
                marginTop: 25,
              }}
            >
              {i18n.t('no_job_found')}
            </Text>
          )}
        </>
      )}

      {isModalVisible && (
        <StaffModal
          formId={formId || ''}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      {filterModal && (
        <FilterModal
          toggleFilter={toggleFilter}
          filterModal={filterModal}
          setFilterModal={setFilterModal}
          FilterStates={FilterStates}
          filterOnPress={filterOnPress}
        />
      )}
    </View>
  );
};

export default ManagerStaff;
