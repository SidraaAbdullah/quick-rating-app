import axios from 'axios';
import { BASE_URL } from '../constants';
import { CancelToken } from 'axios';

export const RECRUITMENT_FORM = async (get, e = {}) => {
  const source = CancelToken.source();
  const res = await axios.get(BASE_URL + `/v1/waiters-job-form`, {
    params: e,
    cancelToken: source.token,
  });
  res.cancel = () => {
    source.cancel('Query was cancelled by React Query');
  };
  return res.data;
};

export const DELETE_WAITER_FORMS = async e => {
  const res = await axios.post(
    BASE_URL + `/v1/waiters-job-form/update-list`,
    e,
  );
  return res.data;
};
