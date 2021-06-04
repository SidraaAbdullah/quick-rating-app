import React from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import i18n from '../../li8n';
import { useQuery } from 'react-query';
import { RECRUITMENT_FORM } from '../../queries';
import { reactQueryConfig } from '../../constants';
import Dash from 'react-native-dash';
import { formatDate } from '../../util/format-date';

const StaffModal = ({ isModalVisible, setModalVisible, formId, profile }) => {
  const { data: waiterFormData, isLoading: waiterFormLoading } = useQuery(
    ['RECRUITMENT_FORM', { form_id: formId, rating_needed: true }],
    RECRUITMENT_FORM,
    {
      ...reactQueryConfig,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${waiterFormData?.data[0]?.telephone_number}`;
    } else {
      number = `tel:${waiterFormData?.data[0]?.telephone_number}`;
    }
    Linking.openURL(number);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        backdropColor={!profile ? '#f9f9f9' : '#000'}
        style={{ borderRadius: 20, backgroundColor: '#fff' }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[styles.modal_container]}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={{ alignItems: 'center', width: '100%' }}>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <View>
                  <Image
                    source={{ uri: waiterFormData?.data[0]?.user_id?.picture }}
                    style={{ width: 90, height: 90, borderRadius: 50 }}
                  />
                </View>
                <View style={{ marginTop: 14 }}>
                  <Text style={styles.text_dispon}>
                    {waiterFormLoading
                      ? 'loading..'
                      : waiterFormData?.data[0]?.position || 'none'}
                  </Text>
                  <TouchableOpacity
                    style={styles.btn_green}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.btnGreen_txt}>
                      {waiterFormLoading
                        ? 'loading..'
                        : waiterFormData?.data[0]?.time === 'half'
                        ? i18n.t('part_time')
                        : i18n.t('full')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20 }}>
                <View>
                  <View>
                    <Text style={styles.expsTxt}>{i18n.t('exp')} </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.exp_year}>
                      {(!waiterFormLoading &&
                        waiterFormData?.data[0]?.experience_count) ||
                        '0'}
                    </Text>
                    <Text style={styles.ansTxt}>
                      {' '}
                      {waiterFormLoading
                        ? 'loading..'
                        : Number(waiterFormData?.data[0]?.experience_count) > 1
                        ? `${i18n.t('years')}s`
                        : i18n.t('years')}
                    </Text>
                  </View>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={[
                        styles.expsTxt,
                        { marginBottom: Platform.OS === 'ios' ? 20 : 0 },
                      ]}
                    >
                      {i18n.t('estb')}
                    </Text>
                  </View>
                  <Text style={styles.petitTxt}>
                    {/* {waiterFormLoading
                        ? 'loading..'
                        : last_exp(waiterFormData) || 'none'} */}
                    {waiterFormLoading ? (
                      'loading..'
                    ) : waiterFormData?.data[0]?.experience[0]
                        ?.enterprise_name ? (
                      <View style={{ justifyContent: 'center' }}>
                        {waiterFormData?.data[0]?.experience.map(item => (
                          <View style={{ paddingTop: 10 }}>
                            <Text>{item?.enterprise_name || 'none'}</Text>
                            <Text>{`${i18n.t('of')} ${formatDate(
                              item?.start_date,
                            )} ${i18n.t('at')} ${
                              item?.end_date
                                ? formatDate(item?.end_date)
                                : i18n.t('still_working')
                            }`}</Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <Text style={{ fontSize: 15, color: 'black' }}>none</Text>
                    )}
                  </Text>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20 }}>
                <View>
                  <View>
                    <Text style={styles.expsTxt}>Qualifications</Text>
                  </View>
                  <View>
                    <Text style={styles.qualifDetail}>
                      {waiterFormLoading
                        ? 'loading..'
                        : waiterFormData?.data[0]?.diploma || 'none'}
                    </Text>
                  </View>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={{ marginVertical: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Text style={styles.expsTxt}>{i18n.t('contact')}</Text>
                </View>
                <View style={styles.recruterBtns}>
                  <TouchableOpacity
                    onPress={() =>
                      waiterFormData?.data[0]?.telephone_number &&
                      openDialScreen()
                    }
                  >
                    <Image
                      source={require('../../assets/images/Call.png')}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                        marginRight: 20,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(
                        `mailto:${waiterFormData?.data[0]?.user_id?.email}`,
                      );
                    }}
                  >
                    <Image
                      source={require('../../assets/images/Email.png')}
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={require('../../assets/images/cross.png')}
              style={{ resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default StaffModal;
