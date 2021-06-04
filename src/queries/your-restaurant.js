import { BASE_URL } from '../constants';

export const GET_YOUR_RES = async (get, e = {}) => {
  let res = await fetch(
    BASE_URL + `/v1/restaurants/${e.user_id}`,
    {
      method: 'get',
    },
  );
  return await res.json();
};
// &max_results=${e.max_results}&page_no=${e.page_no}

export const DELETE_RES = async (e = {}) => {
  let res = await fetch(
    BASE_URL + `/v1/restaurant-waiters/${e.id}`,
    {
      method: 'delete',
      body: JSON.stringify(e),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return await res.json();
};
