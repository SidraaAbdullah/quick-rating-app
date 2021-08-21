/* eslint-disable indent */
import React, { useContext } from 'react';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './index';
import i18n from '../../li8n';
import { Colors } from '../../constants/Theme';
import { ReviewsSkeleton } from '../../components/skeleton';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';
import RatingStar from '../../components/RatingComponent';
import Context from '../../contextApi/context';

const Staff = ({ handleRefferedModalOpen, route, data, navigation, waitersLoading, waitersIsFetching }) => {
  const obj = [1, 2, 3, 4, 5];
  const { state } = useContext(Context);
  const {place_id, restaurant_id} = route?.params;
  return (
    <View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginBottom: 10,
            alignItems: 'center',
          }}
        >
          <Text style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}>
            {i18n.t('waiters')}
          </Text>
          <View style={styles.viewNumRaters}>
            <Text style={[styles.txtNumRaters, { fontFamily: 'ProximaNova' }]}>
              {data?.length || '0'}
            </Text>
          </View>
        </View>
        {!data.length && !waitersLoading && !waitersIsFetching && (
          <Text
            style={[
              styles.no_waiter_found,
              { fontFamily: 'ProximaNovaSemiBold' },
            ]}
          >
            {i18n.t('no_waiter_found')}
          </Text>
        )}
        {waitersLoading ? (
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <ReviewsSkeleton />
            <ReviewsSkeleton />
          </View>
        ) : (
          <FlatList
            data={waitersLoading ? null : data}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={itemData => (
              <TouchableOpacity
                activeOpacity={0.5}
                key={itemData?.item?._id}
                onPress={() => {
                  if (
                    state.userDetails.user_id !== itemData.item?.user_id?._id
                  ) {
                    navigation.navigate('RateYourService', {
                      name:
                        itemData?.item?.user_id?.full_name ||
                        itemData?.item.full_name ||
                        'name missing',
                      image:
                        itemData?.item?.user_id &&
                        itemData?.item?.user_id?.picture,
                      restaurant_id: place_id,
                      waiter_id: itemData?.item?._id,
                      place_id: restaurant_id,
                    });
                  } else {
                    alert(i18n.t('cannot_vote'));
                  }
                }}
                style={styles.viewItemConatier}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {itemData?.item?.user_id ? (
                    <Image
                      style={{ width: 55, height: 55, borderRadius: 30 }}
                      source={{ uri: itemData?.item?.user_id.picture }}
                    />
                  ) : (
                    <SvgHeaderUserIcon height={45} width={45} />
                  )}

                  <View style={{ marginLeft: 10 }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.txtItemName}
                    >
                      {itemData?.item?.user_id?.full_name ||
                        itemData?.item?.full_name ||
                        'name missing'}
                      {/* {itemData?.item?.user_id
                        ? itemData?.item?.user_id?.full_name
                        : itemData?.item?.full_name
                        ? itemData?.item.full_name
                        : 'name missing'} */}
                    </Text>
                    <View
                      pointerEvents="none"
                      style={{ flexDirection: 'row', marginTop: 7 }}
                    >
                      {obj.map((v, i) => {
                        return (
                          <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                            <RatingStar
                              starSize={16}
                              type={
                                v <= itemData.item.rating
                                  ? 'filled'
                                  : v === itemData.item.rating + 0.5
                                  ? 'half'
                                  : 'empty'
                              }
                              notRatedStarColor="rgba(0,0,0,0.1)"
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={28} color="grey" />
              </TouchableOpacity>
            )}
          />
        )}
        <View style={styles.viewAddReview}>
          {/* <Text style={[styles.txtCantFind, { fontFamily: 'ProximaNova' }]}>
            {i18n.t('cant_find_your_server')}
          </Text> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[styles.txtAddReview, { fontFamily: 'ProximaNovaBold' }]}
            >
              {i18n.t('add_your_server')}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleRefferedModalOpen}
              style={styles.btnAdd}
            >
              <AntDesign name="plus" size={16} color={Colors.fontDark} />
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

export { Staff };
