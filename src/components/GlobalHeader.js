import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  BackHandler,
  Image,
} from 'react-native';
import { Body, Right } from 'native-base';
import { Colors } from '../constants/Theme';
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons';

const GlobalHeader = props => {
  const goBackHandler = props => {
    if (props.setting) {
      props.navigation.navigate('Setting');
    } else if (props.Home) {
      props.navigation.navigate('Home');
    } else {
      props.navigation.goBack(null);
    }
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: '',
      headerRight: null,
      headerShown: false,
      headerLeft: null,
      headerTransparent: false,
      headerTitleAlign: 'left',
      // headerRightContainerStyle: { paddingRight: spacing(2) }
    });
  });

  React.useEffect(() => {
    const handleBackButtonClick = () => {
      if (props.setting) {
        props.navigation.navigate('Setting');
        return true;
      }
    };

    props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    });
    props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    });
  });

  return (
    <SafeAreaView
      style={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        width: '100%',
        zIndex: 10,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.yellow,
        position: props.position == 'absolute' ? 'absolute' : 'relative',
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        height: props.height ? props.height : 110,
      }}
    >
      <View
        style={[
          {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            // paddingTop: 27,
            borderRadius: 20,
            flexDirection: 'row',
          },
          Platform.OS === 'ios' ? { borderBottomWidth: 0 } : {},
        ]}
      >
        {props.left ? null : (
          <TouchableOpacity
            disabled={!props.arrow}
            onPress={() => {
              goBackHandler(props);
            }}
            style={{ flex: props.leftText ? 2 : 1 }}
          >
            <View style={[styles.viewLeft]}>
              {props.arrow === true && (
                <MaterialIcons
                  style={{
                    marginTop: -7,
                  }}
                  name="arrow-back"
                  size={props.Arrowsize ? props.Arrowsize : 24}
                  color={props.BackIconColor ? props.BackIconColor : '#000'}
                />
              )}
            </View>
          </TouchableOpacity>
        )}

        <Body
          style={{
            flex: props.centerHide === true ? 0 : 5,
            left: 20,
            marginTop: -7,
            justifyContent: 'center',
            alignItems: props.headingALign ? props.headingALign : 'center',
            alignSelf: 'center',
          }}
        >
          {props.headingText !== '' ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: props.HeadingRow ? props.HeadingRow : 'column',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: 'center',
                    color: props.color ? props.color : '#FFFFFF',
                    fontSize: props.fontSize ? props.fontSize : 24,
                    fontFamily: 'ProximaNovaBold',
                  }}
                >
                  {props?.headingText || ''}
                </Text>
                {props.secondText ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: -8,
                    }}
                  >
                    {props.secondText}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}
        </Body>

        <Right
          style={{
            flex: props.leftText ? 1 : 2,
            height: '100%',
            alignItems: 'center',
          }}
        >
          {props.isFavouriteLoading ? (
            <View style={[styles.arrowView, { marginRight: 10 }]}>
              <ActivityIndicator size={25} color="#FFF" />
            </View>
          ) : props.RightImg ? (
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={45} color="#fff" />
            </View>
          ) : props.logout ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={props.logout}
              style={[styles.viewLeft, { marginTop: -3 }]}
            >
              <Image
                source={require('../assets/images/Disconnect.png')}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
          ) : null}
        </Right>
      </View>
      {props.search ? (
        <View style={styles.viewSearch}>
          <Fontisto name="search" size={20} color={Colors.yellow} />
          <TextInput
            placeholder="Recherchez votre restaurant"
            style={{ flex: 1, height: 43, paddingHorizontal: 15 }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default GlobalHeader;

const styles = StyleSheet.create({
  profileImgStyle: {
    width: 160,
    height: 30,
    marginTop: 137,
  },
  viewSearch: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 45,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnDrawer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  viewImg: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: -10,
  },
  viewLeft: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
