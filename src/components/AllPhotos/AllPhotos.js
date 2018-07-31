import React from 'react';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import auth from '../../firebaseReq/auth';
import myPics from '../../firebaseReq/myPics';
import picRequests from '../../firebaseReq/pics';
import Pics from '../Pics/Pics';
import './AllPhotos.css';

class AllPhotos extends React.Component {
  state = {
    pics: [],
    originalState: [],
    open: false,
    picPreview: '',
  }

  addToMyPics = (imageDetails) => {
    const newImage = {};
    newImage.name = imageDetails.name;
    newImage.image = imageDetails.image;
    newImage.picId = imageDetails.id;
    newImage.desc = imageDetails.desc;
    newImage.uid = auth.getUid();
    newImage.photogId = imageDetails.photogId;
    newImage.dateAdded = moment().format('MMM Do YY');
    myPics
      .postRequest(newImage)
      .then(() => {

      })
      .catch((err) => {
        console.error('error in order post', err);
      });
  }

  componentDidMount () {
    picRequests
      .getAllPics()
      .then((pictures) => {
        this.setState({ pics: pictures, originalState: pictures });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  filterPics = (e) => {
    const originalStateCopy = [...this.state.originalState];
    const searchTerms = e.target.value.toLowerCase();
    const picsFiltered = originalStateCopy.filter(pic => {
      return (pic.name.toLowerCase().includes(searchTerms) || pic.desc.toLowerCase().includes(searchTerms));
    });
    if (searchTerms.length > 0) {
      this.setState({ pics: picsFiltered });
    } else if (searchTerms === '') {
      this.setState({ pics: originalStateCopy });
    }
  }

  filterPicsBackspace = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      const originalStateCopy = [...this.state.originalState];
      const searchTerms = e.target.value.toLowerCase();
      const picsFiltered = originalStateCopy.filter(pic => {
        return (pic.name.toLowerCase().includes(searchTerms) || pic.desc.toLowerCase().includes(searchTerms));
      });
      if (searchTerms.length > 0) {
        this.setState({ pics: picsFiltered });
        console.error('new state');
      } else if (searchTerms === '') {
        this.setState({ pics: originalStateCopy });
      }
    }
  }

  onOpenModal = (previewPath) => {
    this.setState({picPreview: previewPath, open: true});
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render () {
    const { open } = this.state;
    const picComponents = this.state.pics.map((pic) => {
      return (
        <Pics
          key={pic.id}
          details={pic}
          addToMyPics={this.addToMyPics}
          onClick={this.onOpenModal}
        />
      );
    });

    return (
      <div className="AllPhotos col-md-12">
        <h1>Search Photos</h1>
        <div className="row">
          <label htmlFor="search-terms" className="col-sm-6 col-sm-offset-3">
            <input type="text" id="search-terms" className="search col-sm-8 col-sm-offset-2" onKeyUp={this.filterPics} onKeyPress={this.filterPicsBackspace} />
          </label>
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div className="preview-box">
            <img className="preview-pic" src={this.state.picPreview} alt="preview"/>
          </div>
        </Modal>
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
