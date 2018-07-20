import React from 'react';
import './UpdateForm.css';

class UpdateForm extends React.Component {
  state = {
    newDetails: {},
  }

  componentWillMount = () => {
    const {details} = this.props;
    this.setState({newDetails: details});
  }

  saveChanges = e => {
    const {onSubmit} = this.props;
    e.preventDefault();
    onSubmit(this.state.newDetails);
    console.error(this.state.newDetails);
  }

  nameChange = e => {
    const tempDetails = {...this.state.newDetails};
    tempDetails.name = e.target.value;
    this.setState({newDetails: tempDetails});
  }

  descChange = e => {
    const tempDetails = {...this.state.newDetails};
    tempDetails.desc = e.target.value;
    this.setState({newDetails: tempDetails});
  }

  render () {
    const {details} = this.props;
    return (
      <div className="UpdateForm col-sm-12">
        <h3>Update Photo Details</h3>
        <form onSubmit={this.saveChanges}>
          <fieldset>
            <label htmlFor="exampleInputTitle">Title</label>
            <input type="text" className="form-control" id="exampleInputTitle" placeholder={details.name} onChange={this.nameChange}/>
          </fieldset>
          <fieldset>
            <label htmlFor="exampleInputDesc">Description</label>
            <input type="text" className="form-control" id="exampleInputDesc" placeholder={details.desc} onChange={this.descChange} />
          </fieldset>
          <button type="submit" className="btn btn-default">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default UpdateForm;
