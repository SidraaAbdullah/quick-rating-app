import { BASE_URL } from '../constants';
import axios from 'axios';

export const GET_REVIEWS = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/restaurants/review`, {
    params: e,
  });
  return res.data;
};
