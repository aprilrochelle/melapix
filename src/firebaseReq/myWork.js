import axios from 'axios';
import constants from '../constants';

const getMyWork = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/pics.json?orderBy="photogId"&equalTo="${id}"`)
      .then((res) => {
        const myWork = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(key => {
            res.data[key].id = key;
            myWork.push(res.data[key]);
          });
        }
        resolve(myWork);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/pics/${id}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getMyWork, deleteRequest };
