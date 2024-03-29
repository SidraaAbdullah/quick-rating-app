import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    // height: '200%',
    // width: '100%',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // display: 'flex',
    // justifyContent: 'center',
  },
  boxes: {
    fontSize: 16,
    backgroundColor: 'pink',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 14,
  },
});
