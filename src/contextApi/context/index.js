import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
    user_id: '',
  },
  refreshAnimation: false,
  restaurantsDetails: [],
  yourRestaurants: [],
});

export default Context;
