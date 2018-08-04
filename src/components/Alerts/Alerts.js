import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class AlertDismissable extends React.Component {
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
              <Button onClick={onDismiss}>&times;</Button>
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
