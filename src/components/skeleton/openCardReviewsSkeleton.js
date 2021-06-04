import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ReviewsSkeleton = () => {
  return (
    <View style={styles.viewItemContainer}>
      <SkeletonPlaceholder backgroundColor='#f6f6f9' highlightColor="#E0E0E0">
        <View style={styles.Items}>
          <View style={{ width: 45, height: 45, borderRadius: 50 }} />
          <View style={{ marginLeft: 20 }}>
            <View style={{ width: 120, height: 15, borderRadius: 4 }} />
            <View
              style={{ marginTop: 12, width: 80, height: 15, borderRadius: 4 }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
export { ReviewsSkeleton };

const styles = StyleSheet.create({
  Items: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewItemContainer: {
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
});
