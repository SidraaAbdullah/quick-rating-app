import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const HomeCardSkeleton = () => {
  return (
    <View style={styles.skeleton}>
      <SkeletonPlaceholder backgroundColor="#f6f6f9" highlightColor="#E0E0E0">
        <SkeletonPlaceholder.Item width={110} height={20} />
        <SkeletonPlaceholder.Item marginTop={60}>
          <SkeletonPlaceholder.Item width={100} height={15} marginTop={10} />
          <SkeletonPlaceholder.Item width={80} height={15} marginTop={10} />
          <SkeletonPlaceholder.Item width={30} height={15} marginTop={10} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};
export { HomeCardSkeleton };

const styles = StyleSheet.create({
  skeleton: {
    width: Dimensions.get('window').width * 0.455,
    height: 210,
    margin: Dimensions.get('window').width * 0.02,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 20,
  },
});
