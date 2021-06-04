import React from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, Dimensions, Platform } from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';
import { styles } from './style';

const AddCard = ({ navigation }) => {
  const [text, onChangeText] = React.useState();
  const [text2, onChangeText2] = React.useState();
  const [text3, onChangeText3] = React.useState();
  const [text4, onChangeText4] = React.useState();
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            zIndex: 111111,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('add_a_card')}
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
        <ScrollView>
          <View
            style={{
              marginHorizontal: 30,
              alignItems: 'center',
              marginTop: 50,
            }}
          >
            <View style={styles.input_box}>
              <Text style={styles.input_label}>{i18n.t('card_number')}</Text>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={onChangeText}
                value={text}
                placeholder="8888-8888-8888-8888"
                keyboardType="numeric"
                placeholderTextColor={'#485460'}
              />
            </View>
            <View style={styles.input_box}>
              <Text style={styles.input_label}>{i18n.t('date_of_exp')}</Text>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={onChangeText2}
                value={text2}
                placeholder="MM/AA"
                keyboardType="number-pad"
                placeholderTextColor={'#485460'}
              />
            </View>
            <View style={styles.input_box}>
              <Text style={styles.input_label}>CVV</Text>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={onChangeText3}
                value={text3}
                placeholder="123"
                keyboardType="numeric"
                placeholderTextColor={'#485460'}
              />
            </View>
            <View style={styles.input_box}>
              <Text style={styles.input_label}>{i18n.t('pays')}</Text>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={onChangeText4}
                value={text4}
                placeholder="France"
                placeholderTextColor={'#485460'}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.btn_yellow,
            { marginBottom: Platform.OS === 'ios' ? 25 : 15 },
          ]}
        >
          <Text style={{ fontSize: 15, fontFamily: 'ProximaNova' }}>
            {i18n.t('save')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCard;
