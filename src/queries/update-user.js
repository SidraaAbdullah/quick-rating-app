import axios from 'axios';
import { BASE_URL } from '../constants';

export const EDIT_USER = async (e = {}) => {
  let { id, ...rest } = e;
  const res = await axios.patch(BASE_URL + `/v1/users/${id}`, rest);
  return res.data;
};