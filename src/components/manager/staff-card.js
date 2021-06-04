import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import RatingStar from '../../components/RatingComponent';
import Swipeout from 'react-native-swipeout';
import { Feather } from '@expo/vector-icons';
import i18n from '../../li8n';
import { set } from 'react-native-reanimated';

const StaffCard = ({ toggleModal, data, handleDeleteForm }) => {
  const [close, setClose] = useState(false);
  const obj = [1, 2, 3, 4, 5];
  var swipeoutBtns = [
    {
      text: (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleDeleteForm(data?._id)}
          style={{
            backgroundColor: '#fff',
            height: '85%',
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            marginTop: -14,
          }}
        >
          <Feather name="x-circle" size={34} color="#FCDF6F" />
        </TouchableOpacity>
      ),
      height: '100%',
      backgroundColor: 'transparent',
      onPress: () => setClose(true),
    },
  ];
  return (
    <Swipeout
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden',
        marginBottom: 6,
        width: '90%',
        alignSelf: 'center',
      }}
      right={swipeoutBtns}
      close={close}
      autoClose={false}
    >
      <TouchableHighlight
        onPress={() => toggleModal(data?._id)}
        underlayColor="#f9f9f9"
        style={styles.main_card_container}
      >
        <>
          <View style={styles.section1}>
            <View>
              <Image
                source={{ uri: data?.user_id.picture }}
                style={{
                  borderRadius: 30,
                  width: 55,
                  height: 55,
                  // marginBottom:13,
                }}
              />
            </View>
            <View style={{ paddingLeft: 10, alignSelf: 'center' }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.name_staff}
              >
                {data?.user_id?.full_name}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 7 }}>
                {/* {obj.map((v, i) => {
                return (
                  <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                    <RatingStar
                      starSize={17}
                      type={
                        v <= data?.rating
                          ? 'filled'
                          : v === data?.rating + 0.5
                          ? 'half'
                          : 'empty'
                      }
                      notRatedStarColor="#f1f1f1"
                    />
                  </TouchableOpacity>
                );
              })} */}
                <Text style={{ fontFamily: 'ProximaNovaBold', fontSize: 16 }}>
                  {data?.position || i18n.t('waiter')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section2}>
            <TouchableOpacity>
              <AntDesign name="right" size={20} color="#485460" />
            </TouchableOpacity>
          </View>
        </>
      </TouchableHighlight>
    </Swipeout>
  );
};

export default StaffCard;
