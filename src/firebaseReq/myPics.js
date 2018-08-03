import axios from 'axios';
import constants from '../constants';

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

const postRequest = (id, newImage) => {
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
          resolve(myPics);
          myPics.filter(myPic => {
            return (myPic.picId === newImage.picId);
          });
        };
        if (myPics.length > 0) {
          alert('You have already purchased this image. To view, go to My Collection.');
        } else {
          axios
            .post(`${constants.firebaseConfig.databaseURL}/myCollection.json`, newImage)
            .then((res) => {
              resolve(res);
            });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

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

const putRequest = (id, imageObj) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/myCollection/${id}.json`, imageObj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getMyPics, getOnePic, postRequest, deleteRequest, putRequest };
