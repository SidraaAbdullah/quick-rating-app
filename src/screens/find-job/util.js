import i18n from '../../li8n';
export const nicheModalDataUpdated = nicheModalData => {
  let data = [];
  let slotNames = (nicheModalData || []).map(item => {
    let { day, slot } = item;
    let slots = [];
    let updatedSlot = slot.map(item => {
      if (item === 'morning') {
        slots.push(i18n.t('morning'));
      } else if (item === 'mid-day') {
        slots.push(i18n.t('noon'));
      } else if (item === 'evening') {
        slots.push(i18n.t('evening'));
      }
    });
    data.push({ day, slot: slots });
  });
  return data;
};

export const removeId = experience => {
  let filtered = [];
  let exp = experience.map(item => {
    if (item._id) {
      let { _id, ...rest } = item;
      filtered.push(rest);
    } else {
      filtered.push(item);
    }
  });
  return filtered;
};
