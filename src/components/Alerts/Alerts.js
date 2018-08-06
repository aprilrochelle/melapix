import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Alerts.css';

class AlertDismissable extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    showAlert: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
  };

  render () {
    const { text, showAlert, onDismiss } = this.props;
    if (showAlert) {
      return (
        <Alert className="mp-alert col-sm-4 col-sm-offset-4">
          <div className="row">
            <div className="col-sm-6 text-left">
              { text }
            </div>
            <div className="col-sm-6 text-right">
              <Button className="close-btn" onClick={onDismiss}>&times;</Button>
            </div>
          </div>
        </Alert>
      );
    } else {
      return null;
    }
  }
}

export default AlertDismissable;
