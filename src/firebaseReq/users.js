import axios from 'axios';
import constants from '../constants';

const postNewUser = (newUser) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/userAccounts.json`, newUser)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/userAccounts.json?orderBy="uid"&equalTo="${id}"`)
      .then((res) => {
        let userData = {};
        if (res.data !== null) {
          const id = Object.keys(res.data)[0];
          userData = res.data[id];
        }
        resolve(userData);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { postNewUser, getUserById };
