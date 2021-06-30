import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
    user_id: '',
  },
  restaurantsDetails: [],
  yourRestaurants: [],
});

export default Context;
