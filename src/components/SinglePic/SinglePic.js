import React from 'react';
import myPics from '../../firebaseReq/myPics';
import UpdateForm from '../UpdateForm/UpdateForm';
import './SinglePic.css';

class SinglePic extends React.Component {
  state = {
    image: {
      name: '',
      image: '',
      desc: '',
      uid: '',
    },
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    myPics
      .getOnePic(id)
      .then((image) => {
        this.setState({ image });
      })
      .catch((err) => {
        console.error('error with gettin single image', err);
      });
  }

  saveChangesEvent = (newDetails) => {
    const id = this.props.match.params.id;
    myPics
      .putRequest(id, newDetails)
      .then(() => {
        this.setState({image: newDetails});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const { image } = this.state;
    const path = image.image ? require(`./../../images/${image.image}`) : null;

    return (
      <div className="SinglePic col-sm-12">
        <div className="row">
          <div className="col-sm-9">
            <img src={path} alt={image.name} className="single-pic" />
            <h2>{image.name}</h2>
            <p>{image.desc}</p>
          </div>
          <div className="col-sm-3">
            <UpdateForm
              details={image}
              onSubmit={this.saveChangesEvent}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePic;
