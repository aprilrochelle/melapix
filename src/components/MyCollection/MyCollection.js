import React from 'react';
import auth from '../../firebaseReq/auth';
import myPics from '../../firebaseReq/myPics';
import './MyCollection.css';

class MyCollection extends React.Component {
  state = {
    pictures: [],
  }

  componentDidMount () {
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
          <h5>{pic.name}</h5>
          <div className="collection-buttons">
            <button
              className="btn btn-warning"
              onClick={singlePicClick}
            >
              Update
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteClick(pic.id)}
            >
              Delete
            </button>
          </div>
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
