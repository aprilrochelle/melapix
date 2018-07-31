import React from 'react';
import auth from '../../firebaseReq/auth';
import myWork from '../../firebaseReq/myWork';
import './MyWork.css';

class MyWork extends React.Component {
  state = {
    pictures: [],
    info: {
      name: '',
      image: '',
      desc: '',
      photogId: '',
    },
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

  picToUpdateClick = (picInfo) => {
    this.setState({info: picInfo, idToEdit: picInfo.id});
  }

  saveChanges = e => {
    const { info } = this.state;
    const newImgInfo = {};
    newImgInfo.name = info.name;
    newImgInfo.image = info.image;
    newImgInfo.desc = info.desc;
    newImgInfo.photogId = info.photogId;
    e.preventDefault();
    myWork
      .putRequest(info.id, newImgInfo)
      .then(() => {
        myWork
          .getMyWork(auth.getUid())
          .then((pics) => {
            this.setState({ pictures: pics });
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  nameChange = e => {
    const tempImage = { ...this.state.info };
    tempImage.name = e.target.value;
    this.setState({ info: tempImage });
  }

  descChange = e => {
    const tempImage = { ...this.state.info };
    tempImage.desc = e.target.value;
    this.setState({ info: tempImage });
  }

  render () {
    const { info } = this.state;
    const myWorkComponents = this.state.pictures.map(pic => {
      const image = require(`./../../images/${pic.image}`);
      return (
        <div className="col-sm-3 pic-card" key={pic.id}>
          <img className="picture" src={image} alt={pic.name} />
          <h5>{pic.name}</h5>
          <div className="collection-buttons">
            <button
              className="btn btn-warning"
              onClick={() => this.picToUpdateClick(pic)}
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
      <div className="MyWork col-md-12">
        <h1>My Work</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-8 work-collection">
              {
                this.state.pictures.length === 0 ? <h4>You haven't added photos to the database yet.</h4> : myWorkComponents
              }
            </div>
            <div className="col-md-4 update-form">
              <form className="update-form" onSubmit={this.saveChanges}>
                <h3>Update Photo Details</h3>
                <fieldset>
                  <label htmlFor="exampleTitle">Title</label>
                  <input type="text" className="form-control" id="exampleTitle" value={info.name} onChange={this.nameChange} />
                </fieldset>
                <fieldset>
                  <label htmlFor="exampleDesc">Description</label>
                  <input type="text" className="form-control" id="exampleDesc" value={info.desc} onChange={this.descChange} />
                </fieldset>
                <button type="submit" className="btn btn-default save-btn">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyWork;