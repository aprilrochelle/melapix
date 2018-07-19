import React from 'react';
import './UpdateForm.css';

class UpdateForm extends React.Component {

  saveChanges = e => {
    const {onSubmit} = this.props;
    e.preventDefault();

  }

  render () {
    return (
      <div className="UpdateForm col-sm-12">
        <h3>Update Photo Details</h3>
        <form onSubmit={this.saveChanges}>
          <fieldset>
            <label for="exampleInputTitle">Title</label>
            <input type="text" className="form-control" id="exampleInputTitle" placeholder="" />
          </fieldset>
          <fieldset>
            <label for="exampleInputDesc">Description</label>
            <input type="text" className="form-control" id="exampleInputDesc" placeholder="" />
          </fieldset>
          <button type="submit" className="btn btn-default">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default UpdateForm;
