import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const THUMB_RADIUS = 9;

const styles = StyleSheet.create({
  main_card_container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 14,
    // height:50
    paddingTop: 17,
    paddingBottom: 17,
  },
  section1: {
    flexDirection: 'row',
  },
  section2: {
    justifyContent: 'center',
    // paddingTop:10,
    alignItems: 'center',
    paddingRight: 10,
  },
  name_staff: {
    fontFamily: 'ProximaNova',
    fontSize: 18,
    width: 180,
    alignSelf: 'center',
  },
  modal_container: {
    backgroundColor: '#fff',
    height: 'auto',
    alignItems: 'center',
    position: 'relative',
    width: '90%',
    alignSelf: 'center',
  },
  btn_green: {
    backgroundColor: '#FCDF6F',
    borderRadius: 15,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGreen_txt: {
    color: '#000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 15,
    fontFamily: 'ProximaNova',
  },
  text_dispon: {
    fontFamily: 'ProximaNovaBold',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 3,
    paddingBottom: 4,
  },
  first_part_modal: {
    width: '80%',
    alignItems: 'center',
  },
  exp_year: {
    fontFamily: 'ProximaNovaSemiBold',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 25,
  },
  ansTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 15,
    paddingLeft: 3,
    paddingTop: 25,
    textAlign: 'center',
  },
  expsTxt: {
    fontSize: 15,
    fontFamily: 'ProximaNovaBold',
    textAlign: 'center',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    right: 20,
    color: '#000',
  },
  petitTxt: {
    fontSize: 13,
    fontFamily: 'ProximaNova',
    paddingTop: 25,
    color: '#1E272E',
  },
  qualifDetail: {
    fontSize: 15,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
    paddingTop: 25,
    marginHorizontal: 50,
  },
  recruterBtns: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
  },
  filterTxt: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 20,
  },
  postsInput: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  postsLabel: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 14,
    paddingLeft: 4,
    paddingBottom: 5,
  },
  radioBtnTxt: {
    fontFamily: 'ProximaNova',
    fontWeight: '700',
    fontSize: 12,
    paddingLeft: 5,
  },
  slider: {
    color: '#FDDF6F',
    marginLeft: -6,
  },
  fontYears: {
    fontFamily: 'ProximaNova',
    fontSize: 17,
    fontWeight: '700',
  },
  ansFont: {
    fontFamily: 'ProximaNova',
    fontSize: 12,
    fontWeight: '200',
    paddingLeft: 4,
  },
  btnYellow: {
    backgroundColor: '#FCDF6F',
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnTxt: {
    paddingVertical: 15,
    fontFamily: 'ProximaNova',
  },
  btnGray: {
    backgroundColor: '#EAEAEA',
    width: '46%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  root_r: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D8D8D8',
  },
  root_rr: {
    height: 4,
    backgroundColor: '#FDDF6F',
    borderRadius: 2,
  },
  root_t: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#FDDF6F',
    backgroundColor: '#FDDF6F',
  },
});

export default styles;
