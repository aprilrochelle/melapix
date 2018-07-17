import React from 'react';
import picRequests from '../../firebaseReq/pics';
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
        <li>
          <div className="col-md-3">
            <h3>{pic.name}</h3>
          </div>
        </li>
      );
    });

    return (
      <div className="AllPhotos col-md-12">
        <h1>All Photos</h1>
        <ul className="pic-list">
          {picComponents}
        </ul>
      </div>
    );
  }
}

export default AllPhotos;
