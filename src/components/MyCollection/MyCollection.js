import React from 'react';
import auth from '../../firebaseReq/auth';
import myPics from '../../firebaseReq/myPics';
import './MyCollection.css';

class MyCollection extends React.Component {
  state = {
    pictures: [],
  }

  componentWillMount () {
    //  Retrieves all pics saved by the current user
    myPics
      .getMyPics(auth.getUid())
      .then((pics) => {
        this.setState({ pictures: pics });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteClick = (id) => {
    //  Deletes selected image from user's collection
    myPics
      .deleteRequest(id)
      .then(() => {
        const {pictures} = this.state;
        this.setState({pictures: pictures.filter(pic => {
          return pic.id !== id;
        })});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const myPicComponents = this.state.pictures.map(pic => {
      const singlePicClick = () => {
        this.props.history.push(`/singlepic/${pic.id}`);
      };
      const image = require(`./../../images/${pic.image}`);
      return (
        <div className="col-sm-4 pic-card" key={pic.id}>
          <img className="picture" src={image} alt={pic.name} />
          <div className="buttons-and-name">
            <h5>{pic.name}</h5>
            <button
              className="btn btn-dark"
              onClick={singlePicClick}
            >
              <span className="glyphicon glyphicon-fullscreen"></span>
            </button>
            <button
              className="btn btn-dark"
              onClick={() => this.deleteClick(pic.id)}
            >
              <span className="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </div>
      );
    });
    return (
      <div className="MyCollection">
        <h1>My Collection</h1>
        <div className="pic-list">
          {
            this.state.pictures.length === 0 ? <h4>You haven't added any photos to your collection.</h4> : myPicComponents
          }
        </div>
      </div>
    );
  }
}

export default MyCollection;
