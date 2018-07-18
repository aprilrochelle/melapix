import React from 'react';
import auth from '../../firebaseReq/auth';
import myPics from '../../firebaseReq/myPics';
import picRequests from '../../firebaseReq/pics';
import Pics from '../Pics/Pics';
import './AllPhotos.css';

class AllPhotos extends React.Component {
  state = {
    pics: [],
    image: {},
  }

  addToMyPics = (imageDetails) => {
    const newImage = {...this.state.image};
    newImage.name = imageDetails.name;
    newImage.image = imageDetails.image;
    newImage.desc = imageDetails.desc;
    newImage.uid = auth.getUid();
    myPics
      .postRequest(newImage)
      .then(() => {

      })
      .catch((err) => {
        console.error('error in order post', err);
      });
  }

  componentDidMount = () => {
    picRequests
      .getAllPics()
      .then((pics) => {
        this.setState({pics});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const picComponents = this.state.pics.map((pic) => {
      return (
        <Pics
          key={pic.id}
          details={pic}
          addToMyPics={this.addToMyPics}
        />
      );
    });

    return (
      <div className="AllPhotos col-md-12">
        <h1>All Photos</h1>
        <div className="pic-list">
          <div className="row">
            {picComponents}
          </div>
        </div>
      </div>
    );
  }
}

export default AllPhotos;
