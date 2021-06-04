import React from 'react';
import { ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
// import NumberFormat from 'react-number-format';

const MasterCard = ({ navigation }) => {
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
            headingText={i18n.t('master_card')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 7 }}>
        <View style={{ marginTop: 85, marginHorizontal: 30 }}>
          <View>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="* * * * 8 8 8 8"
              placeholderTextColor={'black'}
            />
          </View>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ fontSize: 14, fontFamily: 'ProximaNova' }}>
              {i18n.t('date_of_exp')}
            </Text>
            <Text style={{ fontSize: 14, fontFamily: 'ProximaNovaBold' }}>
              08/2028
            </Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.5} style={styles.btn_yellow}>
          <Text style={{ fontSize: 15, fontFamily: 'ProximaNova' }}>
            {i18n.t('delete_card')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MasterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  input: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
  },
  btn_yellow: {
    backgroundColor: '#FCDF6F',
    width: 300,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
  },
});
