import React from 'react';
import picRequests from '../../firebaseReq/pics';
import Pics from '../Pics/Pics';
import './AllPhotos.css';

class AllPhotos extends React.Component {
  state = {
    pics: [],
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
