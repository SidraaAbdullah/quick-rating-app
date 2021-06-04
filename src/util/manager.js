export const filterSearch = (rating, high, low, avail, position, value) => {
  return {
    rating: rating || '',
    experience_greater: high || '',
    experience_less: low || '',
    time: avail?.length ? [avail] : [],
    position: position || '',
    search: value,
    // rating_needed: true,
    first_item: true,
    filtered_list: true,
  };
};

export const last_exp = waiterFormData => {
  return (
    waiterFormData?.data[0]?.last_experience?.last_exp ||
    waiterFormData?.data[0]?.last_experience?.experience ||
    waiterFormData?.data[0]?.last_experience
  );
};
