import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  whiteCard: {
    backgroundColor: '#fff',
    height: 'auto',
    width: '90%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  topHeading: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 22,
    paddingTop: 10,
  },
  input: {
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 15,
    paddingVertical: 12,
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 12,
  },
  btn_return: {
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_txt: {
    paddingHorizontal: 10,
    fontFamily: 'ProximaNova',
    paddingVertical: 15,
    fontSize: 13,
    textAlign: 'center',
  },
  btn_yellow: {
    backgroundColor: '#FCDF6F',
    borderRadius: 12,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  btn_disable: {
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
