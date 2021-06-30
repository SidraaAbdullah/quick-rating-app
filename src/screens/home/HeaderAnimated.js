import { useNavigation } from '@react-navigation/native';
import React, {
  useLayoutEffect,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SvgHeaderSearchIcon } from '../../components/svg/header_search_icon';
import { HEADER_BAR_HEIGHT, spacing } from '../../constants/layout';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import i18n from '../../li8n';
import Context from '../../contextApi/context';
import { userGivenName } from '../../util';


const HomeScreen = props => {
  const TextInputRef = React.useRef(null);
  const { state } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // const [loader, setLoader] = useState();
  const [hasValue, sethasValue] = useState();

  useEffect(() => {
    sethasValue(props.searchVal ? true : false);
  }, []);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    const renderUserIcon = () => {
      return (
        <View
          style={[
            {
              position: 'absolute',
              right: spacing(2.5),
              top: spacing(1),
              marginTop: 0,
            },
          ]}
        >
          {state.userDetails.user_id ? (
            <>
              {state.userDetails.image ? (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Setting')}
                >
                  <Image
                    style={{
                      borderRadius: 90,
                      width: 40,
                      height: 40,
                    }}
                    source={{
                      uri: state?.userDetails?.image,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Setting')}
                >
                  <FontAwesome name="user-circle-o" size={37} color="black" />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('socialLogin')}
            >
              <Image
                source={require('../../assets/images/user.png')}
                style={{ height: 40, width: 40}}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    };

    const renderTitle = () => {
      return (
        <>
          <View
            style={[
              {
                position: 'absolute',
                left: spacing(2.5),
                top: spacing(1),
                marginTop: 0,
              },
            ]}
          >
            <View
              style={{
                position: 'absolute',
                height: HEADER_BAR_HEIGHT,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'ProximaNovaBold',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  // width:'50%'
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {!state.userDetails.name
                  ? i18n.t('hello')
                  : i18n.t('hello') +
                    ' ' +
                    userGivenName(state.userDetails.name)}
              </Text>
            </View>
          </View>
        </>
      );
    };

    navigation.setOptions({
      headerLeft: renderTitle,
      headerRight: renderUserIcon,
      headerShown: true,
      headerTitle: null,
      headerTransparent: true,
      headerTitleAlign: 'left',
      headerRightContainerStyle: { position: 'absolute' },
      headerLeftContainerStyle: { position: 'absolute' },
    });
  });
  return (
    <>
      <ImageBackground
        style={{
          width: '100%',
          height: 160,
          borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
          borderBottomRightRadius: Dimensions.get('window').width * 0.06,
          overflow: 'hidden',
        }}
        source={require('../../assets/images/Group3.png')}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 10,
              marginHorizontal: 18,
              marginTop: 95,
              marginBottom: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              paddingVertical: 8,
            }}
          >
            <SvgHeaderSearchIcon />
            <TextInput
              ref={TextInputRef}
              returnKeyLabel="Search"
              returnKeyType="done"
              value={props.searchVal}
              onSubmitEditing={() => props.setsearchEnter(props.searchVal)}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setLoading(!loading);
                setIsFocused(false);
              }}
              onChangeText={e => {
                props.setSearchVal(e);
              }}
              placeholder={i18n.t('find_your_restaurant')}
              style={{ flex: 1, paddingHorizontal: 10 }}
            />

            {props.searchVal ? (
              <TouchableOpacity
                onPress={() => {
                  props.setSearchVal('');
                }}
                style={{ paddingHorizontal: 8 }}
              >
                <View
                  style={{
                    backgroundColor: '#FCDF6F',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                  }}
                >
                  <AntDesign name="close" size={14} color="#485460" />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default HomeScreen;
