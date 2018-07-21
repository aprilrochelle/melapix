import React from 'react';
import './Pics.css';

class Pics extends React.Component {
  addToCollection = () => {
    this.props.addToMyPics(this.props.details);
  }

  render () {
    const { details } = this.props;
    const image = require(`./../../images/${details.image}`);
    return (
      <div className="Pics col-sm-3">
        <div className="pic-card">
          <img className="picture" src={image} alt={details.name}/>
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
