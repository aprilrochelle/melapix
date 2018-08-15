import axios from 'axios';
import constants from '../constants';

//  Retrieves photos owned by current photographer user
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

//  Deletes photo from database
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

//  Retrieves single image by id
const getOneImage = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/pics/${id}.json`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//  Updates image details
const putRequest = (id, imageObj) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/pics/${id}.json`, imageObj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getMyWork, deleteRequest, putRequest, getOneImage };
