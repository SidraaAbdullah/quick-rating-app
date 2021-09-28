import Constants from 'expo-constants';
import localhost from '../localhost';
// import * as Network from 'expo-network';
function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return 'development';
  if (env.indexOf('dev') !== -1) return 'development';
  if (env.indexOf('staging') !== -1) return 'staging';
  if (env.indexOf('prod') !== -1) return 'production';
}
export const releaseEnvironment = getEnvVars(Constants.manifest.releaseChannel);
const apiUrl = () => {
  let api_url = localhost;

  if (releaseEnvironment == 'production') {
    // expo build:ios --clear-provisioning-profile --revoke-credentials --release-channel production-1.0.0
    // expo build:android --release-channel production-1.0.0
    //  "ACCESS_COARSE_LOCATION",
    // "ACCESS_FINE_LOCATION"
    api_url =
      'http://ec2-54-169-90-101.ap-southeast-1.compute.amazonaws.com:8080/api';
  } else if (releaseEnvironment == 'staging') {
    // expo publish --release-channel production-1.0.0
    api_url =
      'http://ec2-54-169-90-101.ap-southeast-1.compute.amazonaws.com:8080/api';
  }
  return api_url;
};

let email_to = 'salmansidd991@gmail.com';
if (releaseEnvironment == 'production') {
  email_to = 'salmansidd991@gmail.com';
} else if (releaseEnvironment == 'staging') {
  email_to = 'salmansidd991@gmail.com';
}
export { email_to };

export const BASE_URL = apiUrl();
