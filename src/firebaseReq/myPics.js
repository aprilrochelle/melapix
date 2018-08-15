import axios from 'axios';
import constants from '../constants';

//  Retrieves images by user id
const getMyPics = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/myCollection.json?orderBy="uid"&equalTo="${id}"`)
      .then((res) => {
        const myPics = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(key => {
            res.data[key].id = key;
            myPics.push(res.data[key]);
          });
        }
        resolve(myPics);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//  Retrieves a single image by its firebase id
const getOnePic = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/myCollection/${id}.json`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//  Adds a new image object to the user's collection
const postRequest = (newImage) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/myCollection.json`, newImage)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

//  Deletes an image from the database
const deleteRequest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/myCollection/${id}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getMyPics, getOnePic, postRequest, deleteRequest };
