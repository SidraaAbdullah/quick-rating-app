import axios from 'axios';
import { BASE_URL } from '../constants';

export const APPLY_WAITER = async e => {
  const { id, ...rest } = e;
  let res = await axios.post(
    BASE_URL + `/v1/waiters-job-form/${id}`,
    rest,
  );
  return res;
};
