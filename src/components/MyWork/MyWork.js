import React from 'react';
import auth from '../../firebaseReq/auth';
import myWork from '../../firebaseReq/myWork';
import './MyWork.css';

class MyWork extends React.Component {
  state = {
    pictures: [],
  }

  componentWillMount () {
    myWork
      .getMyWork(auth.getUid())
      .then((pics) => {
        this.setState({ pictures: pics });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteClick = (id) => {
    myWork
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
    const myWorkComponents = this.state.pictures.map(pic => {
      // const singlePicClick = () => {
      //   this.props.history.push(`/singlepic/${pic.id}`);
      // };
      const image = require(`./../../images/${pic.image}`);
      return (
        <div className="col-sm-2 pic-card" key={pic.id}>
          <img className="picture" src={image} alt={pic.name} />
          <h5>{pic.name}</h5>
          <div className="collection-buttons">
            <button
              className="btn btn-warning"
              // onClick={singlePicClick}
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
      <div className="MyWork">
        <h1>My Work</h1>
        {
          this.state.pictures.length === 0 ? <h4>You haven't added photos to the database yet.</h4> : myWorkComponents
        }
      </div>
    );
  }
}

export default MyWork;
