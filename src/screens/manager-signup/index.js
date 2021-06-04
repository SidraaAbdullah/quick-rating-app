import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import i18n from '../../li8n';
import { useMutation } from 'react-query';
import { SIGN_UP } from '../../queries';
import { SEARCH_RESTAURANTS } from '../../queries';
import stylesTextbox from '../find-job/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const validator = require('validator');

const ManagerSignUp = ({ navigation }) => {
  const [signUp] = useMutation(SIGN_UP);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);
  const [showDropdown, setShowDropdown] = useState(false);
  const [restaurants, setRestaurants] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [lastExperience, setLastExperience] = useState({});
  const [searchRestaurant] = useMutation(SEARCH_RESTAURANTS);
  const [loading, setLoading] = useState(false);
  const handleSearchRestaurant = async () => {
    if (lastExperience?.experience) {
      setSearchLoading(true);
      setShowDropdown(true);
      await searchRestaurant(
        { search: lastExperience?.experience },
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

  let restaurantNameTextbox = () => {
    return (
      <View style={stylesTextbox.input_box}>
        <Text>
          {(!lastExperience?.experience || !lastExperience?.restaurant_id) && (
            <>
              {!showDropdown &&
                lastExperience?.experience &&
                !lastExperience?.restaurant_id && (
                  <Text style={{ color: 'red' }}>*Click on search.</Text>
                )}

              {!lastExperience?.restaurant_id &&
                lastExperience?.experience &&
                showDropdown && (
                  <Text style={{ color: 'red' }}>*Select restaurant.</Text>
                )}
            </>
          )}
        </Text>

        <View
          style={[
            stylesTextbox.input_icon,
            { backgroundColor: '#F8F8F8', borderWidth: 0, marginBottom: -16 },
          ]}
        >
          <TextInput
            returnKeyLabel="Find"
            returnKeyType="done"
            onSubmitEditing={handleSearchRestaurant}
            onChangeText={e =>
              setLastExperience({
                experience: e || '',
                restaurant_id:
                  lastExperience?.experience?.length < 2
                    ? ''
                    : lastExperience?.restaurant_id,
              })
            }
            value={lastExperience?.experience}
            style={[
              styles.input_icon_text,
              { textAlign: 'center', width: '90%' },
            ]}
            placeholder={i18n.t('passedat')}
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
          <View style={[stylesTextbox.options, { marginTop: 16 }]}>
            {searchLoading ? (
              <Text style={stylesTextbox.opt_txt}>Loading...</Text>
            ) : (
              (restaurants?.data || []).map((item, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.5}
                  onPress={() => {
                    setShowDropdown(false);
                    setLastExperience({
                      experience: item?.name || '',
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
    );
  };

  const data = [
    {
      id: 1,
      value: name,
      setValue: setName,
      placeholder: i18n.t('res_name'),
    },
    {
      id: 2,
      value: address,
      setValue: setAddress,
      placeholder: i18n.t('address'),
    },
    {
      id: 3,
      value: postalCode,
      setValue: setPostalCode,
      placeholder: i18n.t('code_postal'),
    },
    {
      id: 4,
      value: firstName,
      setValue: setFirstName,
      placeholder: i18n.t('first_name'),
    },
    {
      id: 5,
      value: lastName,
      setValue: setLastName,
      placeholder: i18n.t('last_name'),
    },
    {
      id: 6,
      value: email,
      setValue: setEmail,
      placeholder: i18n.t('email'),
    },
    {
      id: 7,
      value: password,
      setValue: setPassword,
      placeholder: i18n.t('password_sign'),
    },
  ];

  const handleNext = () => {
    if (lastIndex === 7) {
      setIndex(0);
      setLastIndex(3);
    }
    if (index !== 3) {
      setIndex(index + 3);
    } else {
      setIndex(index + 2);
    }
    setLastIndex(lastIndex + 2);
  };

  const handlePrev = () => {
    if (index === 0) {
      alert('no more next');
    }
    if (index === 3) {
      setIndex(index - 3);
    } else {
      setIndex(index - 2);
    }
    setLastIndex(lastIndex - 2);
  };
  let alertValidate =
    lastExperience?.restaurant_id &&
    lastExperience?.experience &&
    address &&
    postalCode &&
    lastName &&
    firstName &&
    email &&
    password;

  let validate =
    lastExperience?.restaurant_id &&
    lastExperience?.experience &&
    address &&
    postalCode &&
    lastName &&
    firstName &&
    email &&
    validator?.isEmail(email) &&
    password;

  const handleSubmit = async () => {
    if (validate) {
      setLoading(true);
      await signUp(
        {
          full_name: firstName || '',
          last_name: lastName || '',
          password: password || '',
          email: email || '',
          restaurant_id: lastExperience?.restaurant_id || '',
          postal_code: postalCode || '',
          restaurant_address: address || '',
        },
        {
          onSuccess: () => {
            alert('Sign up successful! Please login now.');
            navigation.replace('SignIn');
            setLoading(false);
          },
          onError: e => {
            alert(e.response?.data?.message);
            setLoading(false);
          },
        },
      );
    } else {
      // alert(
      //   `*${!firstName ? `First name,` : ''} ${!email ? 'email,' : ''} ${!password ?
      //     'password,' : ''} ${!lastExperience?.restaurant_id ?
      //       'restaurant name' : ''} is required.`,
      // );
      alert(
        `${!alertValidate ? `* Please fill all the fields.` : ''} ${
          email && !validator?.isEmail(email) ? 'Email is not correct!' : ''
        }`,
      );
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      source={require('../../assets/images/splashBg.png')}
    >
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
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.whiteCard}>
          <Text style={styles.topHeading}>
            {index === 0
              ? i18n.t('restaurant')
              : index === 3
              ? i18n.t('manager')
              : null}
          </Text>
          <View
            style={{
              marginVertical: 30,
              width: '93%',
            }}
          >
            {React.Children.toArray(
              data
                .slice(index, lastIndex)
                .map(v => (
                  <>
                    {v.id === 1 ? (
                      restaurantNameTextbox()
                    ) : (
                      <TextInput
                        style={styles.input}
                        onChangeText={e => v.setValue(e)}
                        value={v.value}
                        placeholder={v.placeholder}
                        secureTextEntry={v.id === 7 ? true : false}
                        placeholderTextColor="#707070"
                      />
                    )}
                  </>
                )),
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginBottom: 4,
            }}
          >
            <TouchableOpacity
              style={styles.btn_return}
              onPress={index === 0 ? () => navigation.goBack() : handlePrev}
              activeOpacity={0.4}
            >
              <Text style={styles.btn_txt}>{i18n.t('return')}</Text>
            </TouchableOpacity>
            {lastIndex === 7 ? (
              <TouchableOpacity
                disabled={
                  // lastIndex === 7 ? false  : true &&
                  loading ? true : false
                }
                activeOpacity={0.5}
                style={styles.btn_yellow}
                // style={validate ? styles.btn_yellow : styles.btn_disable}
                onPress={
                  lastIndex > 6
                    ? handleSubmit
                    : null && validate
                    ? handleSubmit
                    : handleNext
                }
              >
                {lastIndex === 7 ? (
                  loading ? (
                    <ActivityIndicator size={25} color="#EBC11B" />
                  ) : (
                    <Text style={styles.btn_txt}>{i18n.t('to_login')}</Text>
                  )
                ) : (
                  <Text style={styles.btn_txt}>{i18n.t('carry_on')}</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btn_yellow}
                onPress={handleNext}
              >
                <Text style={styles.btn_txt}>{i18n.t('carry_on')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default ManagerSignUp;
