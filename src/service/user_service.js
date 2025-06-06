import ENDPOINT from '../constants/endpoints';

export async function authenticateUser({ username, password }) {
  const response = await fetch(ENDPOINT.USER_AUTHENTICATION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    let errorMessage = 'Something went wrong';
    switch (response.status) {
      case 401:
        errorMessage =
          'Your username or password are incorrect. Please try again.';
        break;
      case 400:
        errorMessage =
          'Your username or password are incorrect. Please try again.';
        break;
      default:
        errorMessage = 'Something went wrong. Please try again later.';
        break;
    }

    throw new Error(errorMessage);
  }

  return data;
}

export async function registerUser(user) {
  const response = await fetch(ENDPOINT.USER_REGISTRATION, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(user),
    credentials: 'include',
  });

  if (response.status !== 201) {
    let errorMessage = 'Something went wrong, please try again later.';
    switch (response.status) {
      case 409:
        errorMessage =
          'The provided email is already associated with an account';
        break;
      default:
    }

    throw new Error(errorMessage);
  }

  return response.json();
}
