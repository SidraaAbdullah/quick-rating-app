import { StyleSheet } from 'react-native';
import { Colors } from '../../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // position:'relatives'
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 15,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  viewImg: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'center',
    borderColor: '#FFE685',
    borderWidth: 3,
    // position:'absolute',
    // top:40
  },
  heading1: {
    marginTop: 20,
    marginBottom: 21,
    fontSize: 20,
    color: 'black',
    fontFamily: 'ProximaNovaBold',
  },
  inputsTopTow: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: 270,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
  },
  inputsBottomTwo: {
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    width: 270,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  payment_container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    width: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.45,

    elevation: 1,
  },
  payments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 20,
  },
  lastpayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewPencil: {
    width: 25,
    height: 25,
    backgroundColor: '#1E272E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute',
    zIndex: 11111,
  },
  btnPencil: {
    backgroundColor: '#FCDF6F',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginRight: -40,
    // position:'absolute',
    marginTop: -28,
    marginLeft: 65,
    zIndex: 111,
  },
  paymentMethodLabel: {
    paddingLeft: 10,
    fontSize: 15,
    fontFamily: 'ProximaNova',
  },
  paymentMethodImage: {
    backgroundColor: '#FFF6D4',
    padding: 3,
  },
  btnStyle: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
});

export default styles;
