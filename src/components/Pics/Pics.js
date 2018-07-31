import React from 'react';
import PropTypes from 'prop-types';
import './Pics.css';

class Pics extends React.Component {
  static propTypes = {
    details: PropTypes.object.isRequired,
    addToMyPics: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  addToCollection = () => {
    this.props.addToMyPics(this.props.details);
  }

  modalClick = (image) => {
    this.props.onClick(image);
  }

  render () {
    const { details } = this.props;
    const image = require(`./../../images/${details.image}`);
    return (
      <div className="Pics col-sm-3">
        <div className="pic-card">
          <img className="picture" src={image} alt={details.name} onClick={() => this.modalClick(image)}/>
          <h4>{details.name}</h4>
          <button
            className="btn btn-success"
            onClick={this.addToCollection}
          >
            <span className="glyphicon glyphicon-star-empty"> </span>
             Add to My Collection
          </button>
        </div>
      </div>
    );
  }
}

export default Pics;
