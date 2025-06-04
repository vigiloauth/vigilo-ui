const BASE_URL = '/identity';
const AUTH = 'auth';

const ENDPOINT = {
  USER_AUTHENTICATION: `${BASE_URL}/${AUTH}/login`,
  USER_REGISTRATION: `${BASE_URL}/${AUTH}/signup`,
  PASSWORD_RESET: `${BASE_URL}/${AUTH}/password-reset/confirm`,
};

export default ENDPOINT;
