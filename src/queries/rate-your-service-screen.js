import axios from 'axios';
import { BASE_URL } from '../constants';

export const ADD_RATINGS = async e => {
  let res = await axios.post(BASE_URL + `/v1/waiters-voting/add`, e);
  return res;
};
