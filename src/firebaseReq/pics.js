import axios from 'axios';
import constants from '../constants';

//  Retrieves all images in the database
const getAllPics = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/pics.json`)
      .then((res) => {
        const allPics = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(key => {
            res.data[key].id = key;
            allPics.push(res.data[key]);
          });
        }
        resolve(allPics);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getAllPics };
