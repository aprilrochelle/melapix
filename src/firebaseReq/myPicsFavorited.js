import axios from 'axios';
import constants from '../constants';

const getFavTotals = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json`)
      .then((res) => {
        const picTotals = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(key => {
            res.data[key].id = key;
            picTotals.push(res.data[key]);
          });
        }
        resolve(picTotals);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addToTotal = (totalObj, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/totals/${id}.json`, totalObj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const postTotal = (picId, obj) => {
  return new Promise((resolve, reject) => {
    //  checks the totals for an object containing this picId first
    axios
      .get(`${constants.firebaseConfig.databaseURL}/totals.json?orderBy="picId"&equalTo="${picId}"`)
      .then((res) => {
        //  if an object comes back containing the picId, make a put request
        if (Object.keys(res.data).length > 0) {
          const id = Object.keys(res.data)[0];
          const totals = res.data[id];
          totals.total++;
          addToTotal(totals, id);
        } else if (Object.keys(res.data).length === 0) {
          //  if no object is found with the picId, post the object
          const newObj = {...obj};
          newObj.total = 1;
          axios
            .post(`${constants.firebaseConfig.databaseURL}/totals.json`, newObj)
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

export default { getFavTotals, postTotal };
