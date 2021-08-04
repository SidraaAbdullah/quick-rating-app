import React from 'react';
import Review from '../../components/post-review';
import { useNavigation } from '@react-navigation/native';
const PostReview = ({ route }) => {
  const navigation = useNavigation();
  return <Review navigation={navigation} route={route} />;
};
export default PostReview;
