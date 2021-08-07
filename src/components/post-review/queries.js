import axios from 'axios';
import { BASE_URL } from '../../constants';

export const POST_REVIEW = async e => {
  const res = await axios.post(BASE_URL + `/v1/restaurants/review`, e);
  return res.data;
};
