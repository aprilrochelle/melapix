import React from 'react';
import './Pics.css';

class Pics extends React.Component {
  render () {
    const { details } = this.props;
    const image = require(`./../../images/${details.image}`);
    return (
      <div className="Pics col-sm-3 pic-card">
        <img className="picture" src={image} alt={details.name}/>
        <h4>{details.name}</h4>
      </div>
    );
  }
}

export default Pics;
