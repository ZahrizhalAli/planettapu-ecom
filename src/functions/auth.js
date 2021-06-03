import axios from "axios";

export async function createOrUpdateUser(authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
}

export async function currentUser(authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/current-user`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
}

export async function currentAdmin(authtoken) {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/current-admin`,
    {},
    {
      headers: {
        authtoken: authtoken,
      },
    }
  );
}
