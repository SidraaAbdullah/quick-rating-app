import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/job-hunt.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SEARCH_RESTAURANTS } from '../../queries';
import { useMutation } from 'react-query';
import stylesTextbox from '../../screens/find-job/styles';
import moment from 'moment';
const AddExperienceModal = ({
  setExpModalVisible,
  expModalVisible,
  data,
  setData,
}) => {
  const [modeS, setModeS] = useState('date');
  const [showS, setShowS] = useState(false);
  const [modeL, setModeL] = useState('date');
  const [showL, setShowL] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [post, setPost] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [termsChecked, setTermsChecked] = useState(false);
  const [workHere, setWorkHere] = useState('');
  //search textbox
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [restaurant, setRestaurant] = useState({});
  const [searchRestaurant] = useMutation(SEARCH_RESTAURANTS);

  const handleSearchRestaurant = async () => {
    if (restaurant?.name) {
      setSearchLoading(true);
      setShowDropdown(true);
      await searchRestaurant(
        { search: restaurant?.name },
        {
          onSuccess: res => {
            setSearchLoading(false);
            setRestaurants(res);
          },
          onError: () => {
            setSearchLoading(false);
          },
        },
      );
    }
  };

  const AddData = () => {
    setData([
      ...data,
      {
        enterprise_name: restaurant?.name || '',
        restaurant_id: restaurant?.restaurant_id || '',
        position: post || '',
        still_working: termsChecked,
        start_date: startDate,
        end_date: termsChecked === false ? endDate : '',
      },
    ]);
    setPost('');
    setStart('');
    setEnd('');
    setTermsChecked(false);
    setExpModalVisible(false);
    setRestaurant({});
  };
  // console.log( startDate > endDate ? true: false)

  let validation = termsChecked
    ? restaurant.name && restaurant.restaurant_id && post && start
    : restaurant.name &&
      restaurant.restaurant_id &&
      post &&
      start &&
      end &&
      !(start > end);

  const onChangeStartDate = selectedDate => {
    const currentDate = selectedDate || startDate;
    setShowS(false);
    setStartDate(currentDate);
    setStart(currentDate);
  };
  const showModeStartDate = currentMode => {
    setShowS(true);
    setModeS(currentMode);
  };

  const onChangeLastDate = selectedDate => {
    const currentDate = selectedDate || endDate;
    setShowL(false);
    setEndDate(currentDate);
    setEnd(currentDate);
  };
  const showModeLastDate = currentMode => {
    setShowL(true);
    setModeL(currentMode);
  };

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={expModalVisible}
      onBackdropPress={() => setExpModalVisible(false)}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => setExpModalVisible(false)}
            style={{ alignSelf: 'flex-end', margin: 10 }}
          >
            <AntDesign name="close" size={29} color="#485460" />
          </TouchableOpacity>
          <View
            style={{
              width: 140,
              height: 130,
              alignSelf: 'center',
              marginBottom: -70,
              bottom: -20,
            }}
          />
          <Image
            source={imgWaiter}
            style={styles.imgStyle}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
          {i18n.t('add_exp')}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginVertical: 15,
          }}
        >
          <View style={stylesTextbox.input_box}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text>
                {(!restaurant?.name || !restaurant?.restaurant_id) && (
                  <>
                    {!showDropdown &&
                      restaurant?.name &&
                      !restaurant?.restaurant_id && (
                        <Text style={{ color: 'red' }}>*Click on search.</Text>
                      )}

                    {!restaurant?.restaurant_id &&
                      restaurant?.name &&
                      showDropdown && (
                        <Text style={{ color: 'red' }}>
                          *Select restaurant.
                        </Text>
                      )}
                  </>
                )}
              </Text>
            </View>
            <View style={stylesTextbox.input_icon}>
              <TextInput
                returnKeyLabel="Find"
                returnKeyType="done"
                onSubmitEditing={handleSearchRestaurant}
                onChangeText={e =>
                  setRestaurant({
                    name: e || '',
                    restaurant_id:
                      restaurant?.name?.length < 2
                        ? ''
                        : restaurant?.restaurant_id,
                  })
                }
                value={restaurant?.name}
                style={stylesTextbox.input_icon_text}
                placeholder={i18n.t('name_of_company')}
                placeholderTextColor={'#707375'}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  handleSearchRestaurant();
                }}
              >
                <Image source={require('../../assets/images/search.png')} />
              </TouchableOpacity>
            </View>
            {showDropdown && (
              <View style={stylesTextbox.options}>
                {searchLoading ? (
                  <Text style={stylesTextbox.opt_txt}>Loading...</Text>
                ) : (
                  (restaurants?.data || []).map((item, i) => (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.5}
                      onPress={() => {
                        setShowDropdown(false);
                        setRestaurant({
                          name: item?.name || '',
                          restaurant_id: item?._id || '',
                        });
                      }}
                    >
                      <Text style={stylesTextbox.opt_txt}>{item?.name}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
          <View style={styles.input_box}>
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setPost(e)}
              value={post}
              placeholder={i18n.t('the_post')}
              placeholderTextColor={'#707375'}
            />
          </View>

          <TouchableOpacity onPress={showModeStartDate} style={styles.btnInput}>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: '#707375',
                fontSize: 15,
                paddingTop: 15,
              }}
            >
              {start === ''
                ? i18n.t('start_date')
                : startDate.toLocaleDateString()}
            </Text>
            <DateTimePickerModal
              date={startDate}
              isVisible={showS}
              mode="date"
              onConfirm={onChangeStartDate}
              onCancel={() => setShowS(false)}
              dateFormat="dayofweek"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showModeLastDate}
            style={{ ...styles.btnInput, marginTop: 15, marginBottom: 10 }}
          >
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: '#707375',
                fontSize: 15,
                paddingTop: 15,
              }}
            >
              {end === '' ? i18n.t('end_date') : endDate.toLocaleDateString()}
            </Text>
            <DateTimePickerModal
              date={endDate}
              isVisible={showL}
              minimumDate={startDate}
              mode="date"
              onConfirm={onChangeLastDate}
              onCancel={() => setShowL(false)}
              dateFormat="dayofweek"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 4,
            marginBottom: 20,
            marginTop: -5,
            height: 15,
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <CheckBox
              style={{
                paddingRight: -40,
                marginTop: -5,
              }}
              onClick={() => [
                setTermsChecked(!termsChecked),
                setWorkHere(workHere === '' ? 'work' : ''),
              ]}
              isChecked={termsChecked}
              checkedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/checked-modal.png')}
                />
              }
              unCheckedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/unchecked-modal.png')}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => [
              setTermsChecked(!termsChecked),
              setWorkHere(workHere === '' ? 'work' : ''),
            ]}
            style={{ paddingLeft: 10, paddingTop: 1 }}
          >
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: '#1E272E',
                fontSize: 13,
                marginTop: -2,
              }}
            >
              {i18n.t('still_work')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={AddData}
          disabled={validation ? false : true}
          style={[
            styles.btn_yellow,
            validation && {
              backgroundColor: Colors.yellow,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: 'ProximaNova',
              fontSize: 14,
              color: Colors.fontDark,
            }}
          >
            {i18n.t('add')}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default AddExperienceModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
    paddingLeft: 10,
    paddingRight: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    fontSize: 16,
    textAlign: 'center',
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 16,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    marginBottom: 16,
  },
  btn_yellow: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    alignSelf: 'center',
  },
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgBgStyle: {
    width: '100%',
    height: 200,
  },
  txtConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  imgStyle: {
    width: 240,
    height: 220,
    alignSelf: 'center',
    marginTop: -122,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  btnInput: {
    borderColor: '#E3E3E3',
    borderRadius: 10,
    borderWidth: 1,
    width: 270,
    height: 48,
    // paddingVertical: 13,
    // paddingHorizontal: 10,
    alignItems: 'center',
    //  marginTop:40
  },
});
