import moment from 'moment';

export const formatDate = date => {
  return moment(date).format('MM/DD/YYYY');
};
