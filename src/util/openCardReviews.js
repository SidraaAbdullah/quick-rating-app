export let filteredRestaurant = (state, place_id) => {
  return state?.restaurantsDetails.map(obj =>
    obj.place_id === place_id ? { ...obj, servers: obj.servers + 1 } : obj,
  );
};
export let filteredMinusRestaurant = (state, place_id) => {
  return state?.restaurantsDetails.map(obj =>
    obj.place_id === place_id ? { ...obj, servers: obj.servers - 1 } : obj,
  );
};
