import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  textBold: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 37,
  },
  textLight: {
    fontFamily: 'ProximaNova',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 20,
    paddingTop: 10,
  },
  main_card_container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    padding: 14,
    borderRadius: 14,
    marginVertical: 10,
    width: '100%',
  },
  section1: {
    flexDirection: 'row',
  },
  section2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  name_staff: {
    fontFamily: 'ProximaNova',
    fontSize: 18,
    width: 180,
  },
  boldTxt2: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 20,
    lineHeight: 20,
  },
  lighTxt2: {
    fontFamily: 'ProximaNova',
    fontSize: 16,
    paddingTop: 10,
  },
});

export default styles;
