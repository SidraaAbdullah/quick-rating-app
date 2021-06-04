import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import {
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import styles from './styles';
import { Colors } from '../../constants/Theme';
import Context from '../../contextApi/context';
import { APPLY_WAITER } from '../../queries';
import { useMutation } from 'react-query';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const canidate = require('../../assets/images/canidate.png');
import { AntDesign } from '@expo/vector-icons';
import AddExperienceModal from '../../components/modals/AddExperienceModal';
import AddNicheModal from '../../components/modals/AddNicheModal';
import { removeId, nicheModalDataUpdated } from './util';
import moment from 'moment';
const Find_Job = ({ navigation, route }) => {
  const { form, refetch } = route.params;
  const { state } = useContext(Context);
  // getting first and last name saved in state
  let name = form?.user_id?.full_name || state?.userDetails?.name;
  let fullName = name?.split(' ');
  let savedFirstName =
    fullName?.length > 1
      ? fullName?.slice(0, fullName?.length - 1).join(' ')
      : fullName[0] && fullName[0];
  let savedLastName =
    fullName?.length > 1 ? fullName[fullName?.length - 1] : '';

  const [applyWaiter] = useMutation(APPLY_WAITER);
  const [temp, setTemp] = useState(form?.time || '');
  const [firstName, setFirstName] = useState(savedFirstName);
  const [lastName, setLastName] = useState(savedLastName);
  const [education, setEducation] = useState(form?.diploma || '');
  // const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [position, setPosition] = useState(form?.position || '');
  const [phone, setPhone] = useState(form?.telephone_number || '');
  const [expModalVisible, setExpModalVisible] = useState(false);
  const [nicheModalVisible, setNicheModalVisible] = useState(false);
  const [data, setData] = useState(form?.experience || []);
  const [nicheModalData, setNicheModalData] = useState(
    form?.availability || [],
  );

  const validation = () => {
    if (temp === 'half') {
      return (
        firstName &&
        lastName &&
        position &&
        education &&
        phone &&
        data.length &&
        nicheModalData.length &&
        temp
      );
    } else if (temp === 'full') {
      return (
        firstName &&
        lastName &&
        position &&
        education &&
        phone &&
        data.length &&
        temp
      );
    }
  };

  const handleApplyJob = async () => {
    if (state?.userDetails?.user_id) {
      setLoading(true);
      let jobForm;
      if (temp === 'half') {
        jobForm = {
          id: state?.userDetails?.user_id || '',
          full_name: firstName || '',
          last_name: lastName || '',
          experience: removeId(data) || [],
          telephone_number: phone || '',
          time: temp || '',
          diploma: education || '',
          position: position || '',
          availability: removeId(nicheModalData) || [],
        };
      } else if (temp === 'full')
        jobForm = {
          id: state?.userDetails?.user_id || '',
          full_name: firstName || '',
          last_name: lastName || '',
          experience: removeId(data) || [],
          telephone_number: phone || '',
          time: temp || '',
          diploma: education || '',
          position: position || '',
        };
      await applyWaiter(jobForm, {
        onSuccess: async () => {
          await refetch();
          setLoading(false);
          setModalVisible(true);
        },
        onError: e => {
          setLoading(false);
          alert(e.response?.data?.message);
        },
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
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
            headingText={i18n.t('candidate_profile')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>

        <KeyboardAwareScrollView
          bounces={false}
          enableOnAndroid={true}
          extraScrollHeight={10}
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{
            width: '100%',
          }}
        >
          <View style={styles.main_container}>
            <View>
              <Text style={styles.heading1}> {i18n.t('personal_info')}</Text>
            </View>
            <View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('first_name')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setFirstName(e)}
                  value={firstName}
                  placeholder="Christine"
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('last_name')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setLastName(e)}
                  value={lastName}
                  placeholder="Zhou"
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('position')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setPosition(e)}
                  value={position}
                  placeholder="Waiter"
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('phone')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setPhone(e)}
                  value={phone}
                  placeholder="06 88 88 88 88"
                  placeholderTextColor={'#707375'}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('diploma')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setEducation(e)}
                  value={education}
                  placeholder="BTS Tourisme"
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View style={{ marginVertical: 16 }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'ProximaNovaBold',
                    fontSize: 18,
                  }}
                >
                  {i18n.t('prof_exp')}
                </Text>
                {data.map((v, i) => {
                  return (
                    <View key={i}>
                      {v?.enterprise_name && (
                        <View style={styles.expBox}>
                          <View>
                            <Text style={styles.expTxt1}>
                              {v?.enterprise_name}
                            </Text>
                            <Text style={styles.expTxt2}>{v?.position}</Text>
                            <Text style={styles.expTxt3}>
                              {`${i18n.t('of')} ${moment(v?.start_date).format(
                                'MM/DD/YYYY',
                              )} ${i18n.t('at')} ${
                                v?.end_date
                                  ? moment(v?.end_date).format('MM/DD/YYYY')
                                  : i18n.t('still_working')
                              }`}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
                <View style={styles.viewAddReview}>
                  {/* <Text style={[styles.txtCantFind, { fontFamily: 'ProximaNova' }]}>
                      {i18n.t('cant_find_your_server')}
                      </Text> */}
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={[
                        styles.txtAddReview,
                        { fontFamily: 'ProximaNovaBold' },
                      ]}
                    >
                      {/* {i18n.t('add_your_server')} */}
                      {i18n.t('add_exp')}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setExpModalVisible(true)}
                      style={styles.btnAdd}
                    >
                      <AntDesign
                        name="plus"
                        size={16}
                        color={Colors.fontDark}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ marginBottom: temp === 'half' ? 9 : 16 }}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'ProximaNovaBold',
                    fontSize: 18,
                    marginBottom: 14,
                  }}
                >
                  {i18n.t('availability')}
                </Text>
                <Text style={styles.inputLabel}>{i18n.t('Time')}</Text>
                <View style={styles.chooseButtons_container}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.time_opt,
                      temp === 'full' && {
                        backgroundColor: Colors.yellow,
                        borderTopLeftRadius: 7,
                        borderBottomLeftRadius: 7,
                      },
                    ]}
                    onPress={() => setTemp('full')}
                    value={temp}
                  >
                    <Text style={styles.timeTxt}>{i18n.t('full')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.time_opt,
                      { borderLeftWidth: 1 },
                      temp === 'half' && {
                        backgroundColor: Colors.yellow,
                        borderTopRightRadius: 7,
                        borderBottomRightRadius: 7,
                      },
                    ]}
                    onPress={() => setTemp('half')}
                    value={temp}
                  >
                    <Text style={styles.timeTxt}>{i18n.t('partial')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {temp === 'half' && (
                <View>
                  {(nicheModalDataUpdated(nicheModalData) || []).map((v, i) => {
                    return (
                      <View
                        key={i}
                        style={{ ...styles.availabilityCard, marginBottom: 8 }}
                      >
                        <Text style={styles.availTxt1}>{v?.day}</Text>
                        <Text style={styles.availTxt2}>
                          {` ${v?.slot.join(' - ')}`}
                        </Text>
                      </View>
                    );
                  })}

                  <View style={{ ...styles.viewAddReview, marginBottom: 20 }}>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text
                        style={[
                          styles.txtAddReview,
                          { fontFamily: 'ProximaNovaBold' },
                        ]}
                      >
                        {i18n.t('add_niche')}
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => setNicheModalVisible(true)}
                        style={styles.btnAdd}
                      >
                        <AntDesign
                          name="plus"
                          size={16}
                          color={Colors.fontDark}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleApplyJob}
          disabled={loading ? true : validation() ? false : true}
          style={[
            styles.btn_yellow,
            validation() && {
              backgroundColor: Colors.yellow,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size={29} color="#EBC11B" />
          ) : (
            <Text
              style={{
                fontFamily: 'ProximaNova',
                fontSize: 16,
                color: Colors.fontDark,
              }}
            >
              {i18n.t('candidate_btn')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {modalVisible && (
        <CommonModal
          isVisible={modalVisible}
          handleModalClose={() => {
            setModalVisible(false);
            navigation.navigate('WaiterProfile', { crossIcon: true });
          }}
          image={canidate}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('WaiterProfile', { crossIcon: true });
          }}
          heading={i18n.t('thank_info')}
          subHeadingText={i18n.t('broadcast')}
          buttonText={'OK'}
        />
      )}
      <AddExperienceModal
        expModalVisible={expModalVisible}
        setExpModalVisible={setExpModalVisible}
        data={data}
        setData={setData}
      />
      <AddNicheModal
        nicheModalVisible={nicheModalVisible}
        setNicheModalVisible={setNicheModalVisible}
        nicheModalData={nicheModalData}
        setNicheModalData={setNicheModalData}
      />
    </>
  );
};

export default Find_Job;
{
  /* <View
style={{
  flexDirection: 'row',
  justifyContent: 'space-between',
}}
> */
}
// <View style={styles.input_box}>
//             <Text style={styles.inputLabel}>{i18n.t('experience')}</Text>
//             <View style={{ flexDirection: 'row' }}>
//               <TextInput
//                 style={styles.smallInput}
//                 onChangeText={e => setExperience(e)}
//                 value={experience}
//                 placeholder="5"
//                 maxLength={2}
//                 keyboardType="numeric"
//                 placeholderTextColor={'#707375'}
//               />
//               <Text style={styles.experience}>
//                 {Number(experience) > 1 ? `${i18n.t('year')}s` : i18n.t('year')}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.input_box}>
//             <Text style={styles.inputLabel}>{i18n.t('position')}</Text>
//             <TextInput
//               style={styles.waiterInput}
//               onChangeText={e => setPosition(e)}
//               value={position}
//               placeholder="Waiter"
//               placeholderTextColor={'#707375'}
//             />
//           </View>
//         </View>
