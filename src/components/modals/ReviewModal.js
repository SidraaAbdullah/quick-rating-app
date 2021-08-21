/* eslint-disable indent */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Overlay } from 'react-native-elements';
import RatingStar from '../../components/RatingComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
const ReviewModal = ({isVisible, handleModalClose, item, rating, obj}) => {
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
    >
      <View style={styles.header}>
        <View style={{ flexDirection: 'row'}}>
            <View pointerEvents="none" style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                {obj.map((v, i) => {
                    return (
                        <RatingStar
                            key={i}
                            starSize={20}
                            type={
                            v <= rating
                                ? 'filled'
                                : v === rating + 0.5
                                ? 'half'
                                : 'empty'
                            }
                            notRatedStarColor="rgba(255,255,255, 0.6)"
                        />
                    );
                })}
            </View>
            {item.isGoogle ? (
            <Image
                    source={item.image}
                    style={styles.image}
                />
            ) : null}
        </View>
        <TouchableOpacity
            onPress={handleModalClose}
            style={{ alignSelf: 'flex-end'}}
        >
            <AntDesign name="close" size={29} color="#485460" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Overlay>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
    container: {
        width: '88%',
        padding: 15,
        overflow: 'hidden',
        borderRadius: 15,
    },
    header: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: 10,
    },
    image: {
        width: 20,
        height: 20,
      },
    description: {
        fontWeight: '300',
        color: 'black',
        fontSize: 16,
    },
});
