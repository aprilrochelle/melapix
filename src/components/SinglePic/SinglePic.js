import React from 'react';
import myPics from '../../firebaseReq/myPics';
// import UpdateForm from '../UpdateForm/UpdateForm';
import './SinglePic.css';

class SinglePic extends React.Component {
  state = {
    image: {
      name: '',
      image: '',
      desc: '',
      uid: '',
    },
    newImage: {
      name: '',
      image: '',
      desc: '',
      uid: '',
    },
  }

  componentDidMount () {
    const id = this.props.match.params.id;
    myPics
      .getOnePic(id)
      .then((image) => {
        this.setState({ image: image, newImage: image });
      })
      .catch((err) => {
        console.error('error with gettin single image', err);
      });
  }

  saveChanges = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    myPics
      .putRequest(id, this.state.newImage)
      .then(() => {
        myPics
          .getOnePic(id)
          .then((image) => {
            this.setState({ image: image, newImage: image });
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  nameChange = e => {
    const tempImage = { ...this.state.newImage };
    tempImage.name = e.target.value;
    this.setState({ newImage: tempImage });
  }

  descChange = e => {
    const tempImage = { ...this.state.newImage };
    tempImage.desc = e.target.value;
    this.setState({ newImage: tempImage });
  }

  render () {
    const { image, newImage } = this.state;
    const path = image.image ? require(`./../../images/${image.image}`) : null;

    return (
      <div className="SinglePic col-sm-12">
        <div className="container">
          <div className="col-sm-9">
            <img src={path} alt={image.name} className="single-pic" />
            <h2>{image.name}</h2>
            <p>{image.desc}</p>
          </div>
          <div className="col-sm-3">
            <h3>Update Photo Details</h3>
            <form onSubmit={this.saveChanges}>
              <fieldset>
                <label htmlFor="exampleInputTitle">Title</label>
                <input type="text" className="form-control" id="exampleInputTitle" value={newImage.name} onChange={this.nameChange} />
              </fieldset>
              <fieldset>
                <label htmlFor="exampleInputDesc">Description</label>
                <input type="text" className="form-control" id="exampleInputDesc" value={newImage.desc} onChange={this.descChange} />
              </fieldset>
              <button type="submit" className="btn btn-default">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePic;
