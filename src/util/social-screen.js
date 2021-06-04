import axios from 'axios';

export const userSignUp = async accessToken => {
  return await axios.get('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const userGivenName = (name='') => {
  let given_name;
  let fullName = name.split(' ');
  if (fullName.length >= 3) {
    given_name = fullName[1];
  } else if (fullName.length === 2) {
    given_name = fullName[0];
  } else {
    given_name = name;
  }
  return given_name;
};

export const iPhoneLoginName = (fullName = {}) => {
  if (fullName.givenName) {
    return fullName.givenName;
  }
  if (fullName.middleName) {
    return fullName.middleName;
  } if (fullName.namePrefix) {
    return fullName.namePrefix;
  } if (fullName.nameSuffix) {
    return fullName.nameSuffix;
  }
  if (fullName.nickname) {
    return fullName.nickname;
  }
  return '';
};
