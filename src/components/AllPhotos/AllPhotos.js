import React from 'react';
import Modal from 'react-responsive-modal';
import moment from 'moment';
import AlertDismissable from '../Alerts/Alerts';
import auth from '../../firebaseReq/auth';
import myPics from '../../firebaseReq/myPics';
import picRequests from '../../firebaseReq/pics';
import favorited from '../../firebaseReq/myPicsFavorited';
import Pics from '../Pics/Pics';
import './AllPhotos.css';

class AllPhotos extends React.Component {
  state = {
    pics: [],
    originalState: [],
    open: false,
    picPreview: '',
    showAlert: false,
    alertText: '',
  }

  addToMyPics = (imageDetails) => {
    //  Create newImage object to post to user collection.
    const newImage = {};
    newImage.name = imageDetails.name;
    newImage.image = imageDetails.image;
    newImage.picId = imageDetails.id;
    newImage.desc = imageDetails.desc;
    newImage.uid = auth.getUid();
    newImage.photogId = imageDetails.photogId;
    newImage.dateAdded = moment().format('MMM Do YY');

    //  But first, filter through user's collection to check for a match.
    myPics
      .getMyPics(newImage.uid)
      .then(pics => {
        const filteredPics = pics.filter(pic => {
          return (pic.picId === newImage.picId);
        });

        //  If a pic in the user's collection matces the selected image's id, show an alert and prevent saving again.
        if (filteredPics.length > 0) {
          this.setState({showAlert: true, alertText: 'You have already purchased this image. Please visit My Collection to view.'});
        } else {
          // If no match is found in the existing collection, post the image to the collection.
          myPics
            .postRequest(newImage)
            .then(() => {
              this.setState({showAlert: true, alertText: 'Image Saved.'});

              //  After posting to user's collection, post to totals collection.
              const totalInfo = {};
              totalInfo.picId = imageDetails.id;
              totalInfo.name = imageDetails.name;
              totalInfo.photogId = imageDetails.photogId;
              totalInfo.total = 0;
              favorited
                .postTotal(totalInfo.picId, totalInfo)
                .then(() => {

                });
            });
        }
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

  onDismiss = () => {
    this.setState({showAlert: false});
  }

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
        <AlertDismissable
          text={this.state.alertText}
          showAlert={this.state.showAlert}
          onDismiss={this.onDismiss}
        />
        <div className="row">
          <label htmlFor="search-terms" className="col-sm-6 col-sm-offset-3">
            <input type="text" id="search-terms" className="search col-sm-8 col-sm-offset-2" onKeyUp={this.filterPics} onKeyPress={this.filterPicsBackspace} />
          </label>
        </div>
        <div className="row">
          <p className="text-center"><i>Psst! Click on any image to enlarge it.</i></p>
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
