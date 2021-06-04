import axios from 'axios';
import { BASE_URL } from '../constants';

export const SEARCH_RESTAURANTS = async e => {
  const res = await axios.get(
    BASE_URL + `/v1/restaurants/search/${e.search}`,
  );
  return res.data;
};
