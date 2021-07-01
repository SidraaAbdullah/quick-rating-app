import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import gym from '../../assets/images/gym.png';
import restaurants from '../../assets/images/restaurant.png';
import park from '../../assets/images/park.png';
import cafe from '../../assets/images/cafe.png';
import pharmacy from '../../assets/images/pharmacy.png';
import supermarket from '../../assets/images/supermarket.png';
import saloon from '../../assets/images/salon.png';
import Header from '../home/HeaderAnimated';
import { useQuery } from 'react-query';
import { isSearch } from '../../util';
import { GET_RESTAURANT } from '../../queries';
import { getAsyncStorageValues, reactQueryConfig } from '../../constants';
import * as actionTypes from '../../contextApi/actionTypes';
import Context from '../../contextApi/context';
import { StatusBar } from 'expo-status-bar';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const RenderCategory = props => {
  const {
    title,
    text,
    heightt,
    widthh,
    color,
    image,
    category,
    navigation,
  } = props;

  // const handleLoadMore = () => {
  //   setnextPageToken(restaurantData.restaurants.next_page_token);
  //   // console.log('next page load');
  // };
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('Home', { category })}
    >
      <View
        style={[
          styles.boxes,
          {
            height: 150,
            width: (width * 1) / 1.1,
            marginBottom: 12,
            backgroundColor: color,
          },
        ]}
      >
        <View style={styles.inner}>
          <Image source={image} style={{ width: 70, height: 70 }} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const catInfo = [
  {
    title: 'Restaurants',
    text: 'order food you love',
    heightt: 150,
    widthh: '100%',
    color: '#d60e64',
    image: restaurants,
    category: 'restaurant',
  },
  {
    title: 'Gym',
    text: 'gym lover',
    heightt: 150,
    widthh: '100%',
    color: '#fed271',
    category: 'gym',
    image: gym,
  },
  {
    title: 'cafe',
    text: 'order your coffee',
    heightt: 150,
    widthh: '100%',
    color: '#FFE5CC',
    category: 'cafe',
    image: cafe,
  },
  {
    title: 'Pharmacy',
    text: 'get your medicines first',
    heightt: 150,
    widthh: '100%',
    color: '#ef9fc2',
    category: 'pharmacy',
    image: pharmacy,
  },
  {
    title: 'Barber Shop',
    text: "style's everything",
    heightt: 150,
    widthh: '100%',
    color: 'white',
    category: 'beauty_salon',
    image: saloon,
  },
  {
    title: 'Supermarket',
    text: 'purchasing',
    heightt: 150,
    widthh: '100%',
    color: '#85bfff',
    category: 'supermarket',
    image: supermarket,
  },
  {
    title: 'Amusement Park',
    text: 'Feel your life',
    heightt: 150,
    widthh: '100%',
    category: 'amusement_park',
    color: '#CCFF99',
    image: park,
  },
];

const Boxes = props => {
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
      />
      <StatusBar translucent={true} style="dark" />
      <FlatList
        data={catInfo}
        renderItem={({ item }) => (
          <RenderCategory
            title={item.title}
            text={item.text}
            heightt={item.heightt}
            widthh={item.widthh}
            color={item.color}
            image={item.image}
            category={item.category}
            navigation={props.navigation}
          />
        )}
        // horizontal
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
        // pagingEnabled
        // bounces={false}
        keyExtractor={item => item.id}
        style={styles.container}
      />
      {/* <ScrollView>
        <View style={styles.container}>
          <Text>
            {catInfo.map(item => (
              <RenderCategory
                title={item.title}
                text={item.text}
                heightt={item.heightt}
                widthh={item.widthh}
                color={item.color}
                image={item.image}
              />
            ))}
          </Text>
        </View>
      </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    // backgroundColor: "orange",
    // height: '200%',
    // width: '90%',
    // flexDirection: 'row',
    // padding: 5,
    // flexWrap: 'wrap',
    // left: 25,
    marginTop: 12,
    // position: 'relative',
  },
  boxes: {
    fontSize: 16,
    backgroundColor: 'pink',
    // margin: '10%',
    borderRadius: 10,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    marginBottom: 5,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default Boxes;
