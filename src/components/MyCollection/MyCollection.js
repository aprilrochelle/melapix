import React from 'react';
import auth from '../../firebaseReq/auth';
import myPics from '../../firebaseReq/myPics';
import './MyCollection.css';

class MyCollection extends React.Component {
  state = {
    myPics: [],
  }

  componentDidMount = () => {
    myPics
      .getMyPics(auth.getUid())
      .then((pics) => {
        this.setState({ myPics: pics });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const myPicComponents = this.state.myPics.map(pic => {
      const image = require(`./../../images/${pic.image}`);
      return (
        <div className="col-sm-4 pic-card" key={pic.id}>
          <img className="picture" src={image} alt={pic.name} />
          <h4>{pic.name}</h4>
        </div>
      );
    });
    return (
      <div className="MyCollection">
        <h1>My Collection</h1>
        {myPicComponents}
      </div>
    );
  }
}

export default MyCollection;
